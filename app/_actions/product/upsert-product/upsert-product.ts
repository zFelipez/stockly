"use server";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { upsertProductSchema, UpsertProductSchema } from "./schema";

export async function upsertProduct(data: UpsertProductSchema) {
  upsertProductSchema.parse(data); //aqui valida

  await db.product.upsert({
    where: {
      id: data.id ?? '', // se eu tenho um id igual aum data.id ele atualiza
    },
    update :data
    ,
    create:data //se nao ele cria
    
  });
  revalidatePath("/products");
}
