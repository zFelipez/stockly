import { db } from "@/app/_lib/prisma";
import "server-only";
import dayjs from "dayjs";
import { Prisma } from "@prisma/client";

export type DayTotalRevenue = {
  day: string;
  totalRevenue: number;
};

export type MostSoldProductDto = {
  id?: string;
  name: string;
  totalQuantitySold: number;
  price: number;
 
  status: "IN_STOCK" | "OUT_OF_STOCK";
};

type MostSoldProductQueryResult = {
  id: string;
  name: string;
  totalQuantitySold: number | Prisma.Decimal | null;
  price: Prisma.Decimal;
  stock: number;
};

export type DashboardDataDto = {
  revenue: number;
  revenueToday: number;
  totalSales: number;
  totalStockValue: number;
  totalProducts: number;
  totalLast14DaysRevenue: DayTotalRevenue[];
  mostSoldProducts: MostSoldProductDto[];
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

  const mostSoldProductsPromise = db.$queryRaw<MostSoldProductQueryResult[]>`
    SELECT 
      "Product"."name", 
      SUM("SaleProduct"."quantity") as "totalQuantitySold", "Product"."price", "Product"."stock", "Product"."id"
    FROM "SaleProduct"
    JOIN "Product" ON "SaleProduct"."productId" = "Product"."id"
    GROUP BY "Product"."name", "Product"."price", "Product"."stock", "Product"."id"
    ORDER BY "totalQuantitySold" DESC
    LIMIT 5                                    ;
  `;

  const [
    revenue,
    revenueToday,
    totalSales,
    totalStockValue,
    totalProducts,
    mostSoldProducts,
  ] = await Promise.all([
    revenueQuery,
    revenueTodayQuery,
    db.sale.count(),
    stockValueQuery,
    db.product.count(),
    mostSoldProductsPromise,
  ]);

  const totalLast14DaysRevenue = await Promise.all(
    Array.from({ length: 14 }, (_, index) => {
      const day = dayjs().subtract(13 - index, "day");

      return db.$queryRaw<RevenueResult[]>`
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

  return {
    revenue: Number(revenue[0]?.totalRevenue ?? 0),
    revenueToday: Number(revenueToday[0]?.totalRevenue ?? 0),
    totalSales,
    totalStockValue: Number(totalStockValue[0]?.totalStockValue ?? 0),
    totalProducts,
    totalLast14DaysRevenue,
    mostSoldProducts: mostSoldProducts.map((product) => ({
      id: product.id,
      name: product.name,
      totalQuantitySold: Number(product.totalQuantitySold),
      price: Number(product.price),
      status: Number(product.stock) > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
    })),
  };
}
