"use server";
import { actionClient } from "@/app/_lib/safe-action";
import { deleteSaleIdSchema } from "./schema";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteSaleAction = actionClient
  .schema(deleteSaleIdSchema)
  .action(async ({ parsedInput: { id } }) => {
    const deletedSale = await db.sale.delete({
      where: { id },
    });

    if (!deletedSale) {
      throw new Error("Erro ao deletar venda");
    }
    revalidatePath("/sales");
  });
