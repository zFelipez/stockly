"use server";

import { db } from "@/app/_lib/prisma";
import { deleteIdSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/app/_lib/safe-action";

export const deleteProductAction = actionClient
  .schema(deleteIdSchema)
  .action(async ({ parsedInput: { id } }) => {
    await db.$transaction(async (trx) => {
      const sale = await trx.sale.findUnique({
        where: {
          id: id,
        },

        include: {
          products: true,
        },
      });

      if (!sale) {
        return;
      }

      await trx.product.delete({
        where: {
          id,
        },
      });

      for (const product of sale.products) {
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
    });

    revalidatePath("/", "layout");
  });
