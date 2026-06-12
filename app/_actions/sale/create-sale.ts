"use server";
import { db } from "@/app/_lib/prisma";
import {createSaleSchema } from "./schema";
import { Decimal } from "@prisma/client/runtime/client";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/app/_lib/safe-action";
import { returnValidationErrors } from "next-safe-action";

export const createSale = actionClient
  .schema(createSaleSchema)
  .action(async ({ parsedInput: { products } }) => {
    await db.$transaction(async (tsx) => {
      //garantir que todas as operações sejam atômicas, ou seja, ou todas são bem-sucedidas ou nenhuma é aplicada
      const sale = await tsx.sale.create({
        data: {
          date: new Date(), // crio uma nova venda
        },
      });

      for (const product of products) {
        const productFromDb = await db.product.findUnique({
          where: {
            id: product.id,
          },
        });

        if (!productFromDb) {
          returnValidationErrors(createSaleSchema, {
            _errors: ["product not found"],
          });
        }

        const productIsOutOfStock = productFromDb.stock < 0;

        if (productIsOutOfStock) {
          returnValidationErrors(createSaleSchema, {
            _errors: [`product ${productFromDb.name} is out of stock`],
          });
        }

        await tsx.saleProduct.create({
          data: {
            saleId: sale.id,
            productId: product.id,
            quantity: product.quantity,
            unitPrice: productFromDb.price as Decimal,
          },
        });

        await tsx.product.update({
          where: {
            id: product.id,
          },
          data: {
            stock: {
              decrement: product.quantity,
            },
          },
        });

        revalidatePath("/sales");
        revalidatePath("/products");
      }
    });
  });
