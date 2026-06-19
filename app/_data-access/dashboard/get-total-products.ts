import "server-only";

import { db } from "@/app/_lib/prisma";

export async function getTotalProducts(): Promise<number> {
  return db.product.count();
}
