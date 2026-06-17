import 'server-only'
import { db } from "@/app/_lib/prisma";

export async function getTotalRevenue(): Promise<number> {
  const revenueQuery = await db.$queryRaw<{ totalRevenue: number }[]>`
    SELECT
      SUM("SaleProduct"."unitPrice" * "SaleProduct"."quantity") as "totalRevenue"
    FROM "SaleProduct"
    INNER JOIN "Sale"
      ON "SaleProduct"."saleId" = "Sale"."id"

  `;

  return revenueQuery[0]?.totalRevenue || 0;
}
