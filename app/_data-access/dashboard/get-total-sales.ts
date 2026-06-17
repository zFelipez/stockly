import "server-only";

import { db } from "@/app/_lib/prisma";

export async function getTotalSales(): Promise<number> {
  return db.sale.count();
}
