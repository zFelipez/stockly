import { db } from "@/app/_lib/prisma";
import "server-only";

type DashboardDataDto = {
  revenue: number;
  revenueToday: number;
  totalSales: number;
  totalStockValue: number;
  totalProducts: number;
};

type RevenueResult = {
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

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const [
    revenue,
    revenueToday,
    totalSales,
    totalStockValue,
    totalProducts,
  ] = await Promise.all([
    db.$queryRawUnsafe<RevenueResult[]>(revenueQuery),
    db.$queryRawUnsafe<RevenueResult[]>(
      revenueTodayQuery,
      startOfDay,
      endOfDay
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
  };
}