import { db } from '@/app/_lib/prisma';
import 'server-only';


export async function getTotalStockValue(): Promise<number> {
  const stockValueQuery = await db.$queryRaw<{ totalStockValue: number }[]>`
      SELECT
        SUM("price" * "stock") as "totalStockValue"
      FROM "Product"
    `;
  return Number(stockValueQuery[0]?.totalStockValue ?? 0);
}