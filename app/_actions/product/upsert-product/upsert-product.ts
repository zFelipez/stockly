"use server";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { upsertProductSchema } from "./schema";
import { actionClient } from "@/app/_lib/safe-action";

export const upsertProductAction = actionClient
  .schema(upsertProductSchema)
  .action(async ({ parsedInput: { id, ...rest } }) => {
    await db.product.upsert({
      where: {
        id: id ? id : "", // se eu tenho um id igual aum parsedInput.id ele atualiza
      },
      update: rest,
      create: { id, ...rest }, //se nao ele cria
    });
    revalidatePath("/products");
    revalidatePath("/");
    
  });
