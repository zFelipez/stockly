import { db } from "@/app/_lib/prisma";
import "server-only";
import dayjs from "dayjs";
import { Prisma } from "@prisma/client";

export type DayTotalRevenue = {
  day: string;
  totalRevenue: number;
};

export type DashboardDataDto = {
  revenue: number;
  revenueToday: number;
  totalSales: number;
  totalStockValue: number;
  totalProducts: number;
  totalLast14DaysRevenue: DayTotalRevenue[];
};

type RevenueResult = {
  totalRevenue: Prisma.Decimal | null;
};

type StockValueResult = {
  totalStockValue: Prisma.Decimal | null;
};

export async function getDashboard(): Promise<DashboardDataDto> {
  const startOfToday = dayjs().startOf("day").toDate();
  const endOfToday = dayjs().endOf("day").toDate();

  const revenueQuery = db.$queryRaw<RevenueResult[]>`
    SELECT
      SUM("SaleProduct"."unitPrice" * "SaleProduct"."quantity") as "totalRevenue"
    FROM "SaleProduct"
    INNER JOIN "Sale"
      ON "SaleProduct"."saleId" = "Sale"."id"
  `;

  const revenueTodayQuery = db.$queryRaw<RevenueResult[]>`
    SELECT
      SUM("SaleProduct"."unitPrice" * "SaleProduct"."quantity") as "totalRevenue"
    FROM "SaleProduct"
    INNER JOIN "Sale"
      ON "SaleProduct"."saleId" = "Sale"."id"
    WHERE "Sale"."date" BETWEEN ${startOfToday} AND ${endOfToday}
  `;

  const stockValueQuery = db.$queryRaw<StockValueResult[]>`
    SELECT
      SUM("price" * "stock") as "totalStockValue"
    FROM "Product"
  `;

  const [
    revenue,
    revenueToday,
    totalSales,
    totalStockValue,
    totalProducts,
  ] = await Promise.all([
    revenueQuery,
    revenueTodayQuery,
    db.sale.count(),
    stockValueQuery,
    db.product.count(),
  ]);

  const totalLast14DaysRevenue = await Promise.all(
    Array.from({ length: 14 }, (_, index) => {
      const day = dayjs().subtract(13 - index, "day");

      return db
        .$queryRaw<RevenueResult[]>`
          SELECT
            SUM("SaleProduct"."unitPrice" * "SaleProduct"."quantity") as "totalRevenue"
          FROM "SaleProduct"
          INNER JOIN "Sale"
            ON "SaleProduct"."saleId" = "Sale"."id"
          WHERE "Sale"."date"
            BETWEEN ${day.startOf("day").toDate()}
            AND ${day.endOf("day").toDate()}
        `
        .then((result) => ({
          day: day.format("DD/MM"),
          totalRevenue: Number(result[0]?.totalRevenue ?? 0),
        }));
    }),
  );

  return {
    revenue: Number(revenue[0]?.totalRevenue ?? 0),
    revenueToday: Number(revenueToday[0]?.totalRevenue ?? 0),
    totalSales,
    totalStockValue: Number(totalStockValue[0]?.totalStockValue ?? 0),
    totalProducts,
    totalLast14DaysRevenue,
  };
}