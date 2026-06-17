import "server-only";

import { Prisma } from "@prisma/client";

import {
  DayTotalRevenue,
  getTotalLast14DaysRevenue,
} from "./get-total-last-14-day-revenue";
import { getMostSoldProducts } from "./get-most-sold-products";
import { db } from "@/app/_lib/prisma";

export type MostSoldProductDto = {
  id?: string;
  name: string;
  totalQuantitySold: number;
  price: number;

  status: "IN_STOCK" | "OUT_OF_STOCK";
};

export type MostSoldProductQueryResult = {
  id: string;
  name: string;
  totalQuantitySold: number | Prisma.Decimal | null;
  price: Prisma.Decimal;
  stock: number;
};

export { type DayTotalRevenue };

type GetDashboardResponse = {
  totalProducts: number;
  totalLast14DaysRevenue: DayTotalRevenue[];
  mostSoldProducts: MostSoldProductDto[];
};

export async function getDashboard(): Promise<GetDashboardResponse> {
  const [totalProducts, totalLast14DaysRevenue, mostSoldProducts] =
    await Promise.all([
      db.product.count(),
      getTotalLast14DaysRevenue(),
      getMostSoldProducts(),
    ]);

  return {
    totalProducts,
    totalLast14DaysRevenue,
    mostSoldProducts,
  };
}
