"use server";

import { db } from "@/app/_lib/prisma";
import { deleteIdSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/app/_lib/safe-action";

export const deleteProductAction = actionClient
  .schema(deleteIdSchema)
  .action(async ({ parsedInput: { id } }) => {
    await db.$transaction(async (trx) => {
      const saleProducts = await trx.saleProduct.findMany({
        where: {
          productId: id,
        },
        select: {
          saleId: true,
        },
      });

      const saleIds = [
        ...new Set(saleProducts.map((saleProduct) => saleProduct.saleId)),
      ];

      if (saleIds.length > 0) {
        const sales = await trx.sale.findMany({
          where: {
            id: {
              in: saleIds,
            },
          },
          include: {
            products: true,
          },
        });

        const salesToDelete = sales
          .filter((sale) => sale.products.length === 1)
          .map((sale) => sale.id);

        if (salesToDelete.length > 0) {
          await trx.sale.deleteMany({
            where: {
              id: {
                in: salesToDelete,
              },
            },
          });
        }
      }

      await trx.product.delete({
        where: {
          id,
        },
      });
    });

    revalidatePath("/", "layout");
  });
