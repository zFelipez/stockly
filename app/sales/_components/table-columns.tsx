"use client";

import { SalesDto } from "@/app/_data-access/sale/get-sales";
import { transformCurrency } from "@/app/_helpers/currency";

import { ColumnDef } from "@tanstack/react-table";
import {} from "lucide-react";
import { SaleActionsCell } from "./sale-actions-cell";
import { Product } from "@prisma/client";
import { ComboboxOption } from "@/app/_components/ui/combobox";

interface SaleTableColumn extends SalesDto {
  products: Product[];
  productsOptions: ComboboxOption[];
}

export const saleTableColumns: ColumnDef<SaleTableColumn>[] = [
  {
    accessorKey: "id",
    header: "Produtos ",
    cell: ({
      row: {
        original: { productsNames },
      },
    }) => productsNames,
  },
  {
    accessorKey: "totalOfProducts",
    header: "Quantidade de Produtos",
    cell: ({ row: { original } }) => original.totalOfProducts,
  },
  {
    accessorKey: "productsAmount",
    header: "Valor Total ",
    cell: ({ row: { original } }) =>
      transformCurrency(Number(original.productsAmount)),
  },
  {
    accessorKey: "saleDate",
    header: "Data da Venda ",
    cell: () => new Date().toLocaleDateString("pt-BR"),
  },
  {
    accessorKey: "acoes",
    header: "Ações",
    cell: ({ row: { original: sale } }) => {
      return <SaleActionsCell  products ={ sale.products} productsOptions= { sale.productsOptions}sale={sale}></SaleActionsCell>;
    },
  },
];
