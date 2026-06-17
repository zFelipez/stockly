import { db } from "@/app/_lib/prisma";
import "server-only";
import dayjs from "dayjs";

export type DayTotalRevenue = {
  day: string ;
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

export type RevenueResult = {
  totalRevenue: number | null;
};

export async function getDashboard(): Promise<DashboardDataDto> {
  const revenueQuery = `
    SELECT SUM("unitPrice" * "quantity") as "totalRevenue"
    FROM "SaleProduct"
  `;

  const revenueTodayQuery = `
    SELECT SUM("unitPrice" * "quantity") as "totalRevenue"
    FROM "SaleProduct"
    WHERE "createdAt" >= $1
    AND "createdAt" <= $2
  `;

  const today = dayjs().endOf("day").toDate();

  const last14Days = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(
    (daysAgo) => {
      return dayjs(today).subtract(daysAgo, "day");
    },
  );

  const daysTotalRevenue: DayTotalRevenue[] = [];

  for (const day of last14Days) {
    const dayTotalRevenue = await db.$queryRawUnsafe<
      { totalRevenue: number }[]
    >(
      `
        SELECT SUM("unitPrice" * "quantity") as "totalRevenue"
        FROM "SaleProduct"
        WHERE "createdAt" >= $1
        AND "createdAt" <= $2
      `,
      day.startOf("day").toDate(),
      day.endOf("day").toDate(),
    );

    daysTotalRevenue.push({
      day: day.format("DD/MM"),
      totalRevenue: Number(dayTotalRevenue[0].totalRevenue) || 0,
    });
  }

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const [revenue, revenueToday, totalSales, totalStockValue, totalProducts] =
    await Promise.all([
      db.$queryRawUnsafe<RevenueResult[]>(revenueQuery),
      db.$queryRawUnsafe<RevenueResult[]>(
        revenueTodayQuery,
        startOfDay,
        endOfDay,
      ),
      db.sale.count(),
      db.product.aggregate({
        _sum: {
          stock: true,
        },
      }),
      db.product.count(),
    ]);

  return {
    revenue: Number(revenue[0]?.totalRevenue) || 0,
    revenueToday: Number(revenueToday[0]?.totalRevenue) || 0,
    totalSales,
    totalStockValue: Number(totalStockValue._sum.stock) || 0,
    totalProducts,
    totalLast14DaysRevenue: daysTotalRevenue,
  };
}
