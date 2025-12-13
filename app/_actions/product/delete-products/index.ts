"use server";

import { db } from "@/app/_lib/prisma";
import { DeleteIdSchema, deleteIdSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const deleteProduct = async ({ id }: DeleteIdSchema) => {
  deleteIdSchema.parse({ id }); 
 
  await db.product.delete({
    where: {
      id,
    },
  });
  revalidatePath("/products");
};
