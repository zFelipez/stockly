"use server";
import { db } from "@/app/_lib/prisma";
import { createSaleSchema } from "./schema";
import { Decimal } from "@prisma/client/runtime/client";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/app/_lib/safe-action";
import { returnValidationErrors } from "next-safe-action";

export const upsertSale = actionClient
  .schema(createSaleSchema)
  .action(async ({ parsedInput: { saleId, products } }) => {
    const isUpdatingSale = Boolean(saleId);

    await db.$transaction(async (trx) => {
      //garantir que todas as operações sejam atômicas, ou seja, ou todas são bem-sucedidas ou nenhuma é aplicada
      if (isUpdatingSale) {
        const existingSale = await trx.sale.findUnique({
          where: {
            id: saleId,
          },
          include: {
            products: true,
          },
        });

        if (!existingSale) {
          return;
        }

        for (const product of existingSale.products) {
          await trx.product.update({
            where: {
              id: product.productId,
            },
            data: {
              stock: {
                increment: product.quantity,
              },
            },
          });
        }

        await trx.saleProduct.deleteMany({
          where: {
            saleId,
          },
        });
      }

      const sale = isUpdatingSale
        ? await trx.sale.update({
            where: {
              id: saleId,
            },
            data: {
              date: new Date(),
            },
          })
        : await trx.sale.create({
            data: {
              date: new Date(),
            },
          });

      for (const product of products) {
        const productFromDb = await trx.product.findUnique({
          where: {
            id: product.id,
          },
        });

        if (!productFromDb) {
          throw returnValidationErrors(createSaleSchema, {
            _errors: ["product not found"],
          });
        }

        const productIsOutOfStock = product.quantity > productFromDb.stock;

        if (productIsOutOfStock) {
          throw returnValidationErrors(createSaleSchema, {
            _errors: [`product ${productFromDb.name} is out of stock`],
          });
        }

        await trx.saleProduct.create({
          data: {
            saleId: sale.id,
            productId: product.id,
            quantity: product.quantity,
            unitPrice: productFromDb.price as Decimal,
          },
        });

        await trx.product.update({
          where: {
            id: product.id,
          },
          data: {
            stock: {
              decrement: product.quantity,
            },
          },
        });
      }
    });
    revalidatePath("/sales");
    revalidatePath("/products");
    revalidatePath("/");
  });
