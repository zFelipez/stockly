"use server";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { createProductSchema, CreateProductSchema } from "./schema";


export async function createProduct( data : CreateProductSchema) {
  
  createProductSchema.parse(data ) //aqui valida 

  await db.product.create({
    data
  });
  revalidatePath("/products");
}


