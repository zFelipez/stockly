"use server";
import { db } from "@/app/_lib/prisma";
import { CreateSaleSchema, createSaleSchema } from "./schema";
import { Decimal } from "@prisma/client/runtime/client";
import { revalidatePath } from "next/cache";

export const createSale = async (products: CreateSaleSchema) => {
  createSaleSchema.parse(products);

  await db.$transaction(async (tsx) => { //garantir que todas as operações sejam atômicas, ou seja, ou todas são bem-sucedidas ou nenhuma é aplicada
    const sale = await tsx.sale.create({
      data: {
        date: new Date(), // crio uma nova venda
      },
    });

    for (const product of products.products) {
      const productFromDb = await db.product.findUnique({
        where: {
          id: product.id,
        },
      });

      if (!productFromDb) {
        throw new Error("Unique price is not defined");
      }

      const productIsOutOfStock = productFromDb.stock < 0;

      if (productIsOutOfStock) {
        throw new Error("Product is out of stock ");
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
};
