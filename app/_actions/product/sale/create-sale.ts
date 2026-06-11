"use server";
import { db } from "@/app/_lib/prisma";
import { CreateSaleSchema, createSaleSchema } from "./schema";
import { Decimal } from "@prisma/client/runtime/client";
import { revalidatePath } from "next/cache";

export const createSale = async (products: CreateSaleSchema) => {
  createSaleSchema.parse(products);

  const sale = await db.sale.create({
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

    await db.saleProduct.create({
      data: {
        saleId: sale.id,
        productId: product.id,
        quantity: product.quantity,
        unitPrice: productFromDb.price as Decimal,
      },
    });


    await db.product.update({
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


  
};
