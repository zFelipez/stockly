"use server";

import { db } from "@/app/_lib/prisma";
import { deleteIdSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/app/_lib/safe-action";

export const deleteProductAction = actionClient.schema(deleteIdSchema).action(
  async ({ parsedInput: { id } }) => {
    await db.product.delete({
      where: {
        id,
      },
    });
    revalidatePath("/products");
  },
);
