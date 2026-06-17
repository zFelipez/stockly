import { db } from "@/app/_lib/prisma";
import "server-only";
import {
  MostSoldProductDto,
  MostSoldProductQueryResult,
} from "./get-dashboard";

export async function getMostSoldProducts(): Promise<MostSoldProductDto[]> {
  const mostSoldProducts = await db.$queryRaw<MostSoldProductQueryResult[]>`
       SELECT 
         "Product"."name", 
         SUM("SaleProduct"."quantity") as "totalQuantitySold", "Product"."price", "Product"."stock", "Product"."id"
       FROM "SaleProduct"
       JOIN "Product" ON "SaleProduct"."productId" = "Product"."id"
       GROUP BY "Product"."name", "Product"."price", "Product"."stock", "Product"."id"
       ORDER BY "totalQuantitySold" DESC
       LIMIT 5                                    ;
     `;

  const mostSold: MostSoldProductDto[] = mostSoldProducts.map((product) => ({
    id: product.id,
    name: product.name,
    totalQuantitySold: Number(product.totalQuantitySold),
    price: Number(product.price),
    status: Number(product.stock) > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
  }));
  return mostSold;
}
