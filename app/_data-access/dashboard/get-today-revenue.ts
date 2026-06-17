import 'server-only'
import { db } from "@/app/_lib/prisma";
import dayjs from "dayjs";

export async function getTodayRevenue() {
  const startOfToday = dayjs().startOf("day").toDate();
  const endOfToday = dayjs().endOf("day").toDate();

  const revenueTodayQuery = await db.$queryRaw< { totalRevenue: number }[]>`
    SELECT
      SUM("SaleProduct"."unitPrice" * "SaleProduct"."quantity") as "totalRevenue"
    FROM "SaleProduct"
    INNER JOIN "Sale"
      ON "SaleProduct"."saleId" = "Sale"."id"
    WHERE "Sale"."date" BETWEEN ${startOfToday} AND ${endOfToday}
  `;

  return Number(revenueTodayQuery[0]?.totalRevenue ?? 0);
}
