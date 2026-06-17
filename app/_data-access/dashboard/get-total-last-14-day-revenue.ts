import { db } from "@/app/_lib/prisma";
import dayjs from "dayjs";
import "server-only";

export type DayTotalRevenue = {
  day: string;
  totalRevenue: number;
};

export async function getTotalLast14DaysRevenue(): Promise<DayTotalRevenue[]> {
  const totalLast14DaysRevenue = await Promise.all(
    Array.from({ length: 14 }, async (_, index) => {
      const day = dayjs().subtract(13 - index, "day");

      return await db.$queryRaw<{ totalRevenue: number | null }[]>`
          SELECT
            SUM("SaleProduct"."unitPrice" * "SaleProduct"."quantity") as "totalRevenue"
          FROM "SaleProduct"
          INNER JOIN "Sale"
            ON "SaleProduct"."saleId" = "Sale"."id"
          WHERE "Sale"."date"
            BETWEEN ${day.startOf("day").toDate()}
            AND ${day.endOf("day").toDate()}
        `.then((result) => ({
        day: day.format("DD/MM"),
        totalRevenue: Number(result[0]?.totalRevenue ?? 0),
      }));
    }),
  );

  return totalLast14DaysRevenue;
}
