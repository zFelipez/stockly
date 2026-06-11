import "server-only";

import { db } from "@/app/_lib/prisma";

export type SalesDto = {
  id: string;
  productsNames: string[];
  totalOfProducts: number;
  productsAmount: number;
  saleDate: Date;
};

export const getSales = async (): Promise<SalesDto[]> => {
  const sales = await db.sale.findMany({
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  });

  const formattedSales = sales.map((sale) => {
    const productsNames = sale.products.map(
      (productObject) => productObject.product.name,
    ).join(' · ');

    const totalOfProducts = sale.products.reduce(
      (acc, productObject) => Number(productObject.quantity) + acc,
      0,
    );

    const productsAmount = sale.products.reduce(
      (acc, productObject) =>
        Number(productObject.unitPrice) * Number(productObject.quantity) + acc,
      0,
    );

    return {
      id: sale.id,
      productsNames,
      totalOfProducts,
      productsAmount,
      saleDate: sale.createdAt,
    };
  });

  return formattedSales;
};
