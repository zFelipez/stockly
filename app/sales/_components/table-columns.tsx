"use client";

import { Button } from "@/app/_components/ui/button";
import { SalesDto } from "@/app/_data-access/sale/get-sales";
import { transformCurrency } from "@/app/_helpers/currency";
import { ActionsCell } from "@/app/products/_components/actions-cell";

import { ColumnDef } from "@tanstack/react-table";
import {} from "lucide-react";


export const saleTableColumns: ColumnDef<SalesDto>[] = [
  {
    accessorKey: "id",
    header: "Produtos ",
    cell: ({ row: { original : { productsNames } } }) => productsNames,
  },
  {
    accessorKey: "totalProducts",
    header: "Quantidade de Produtos",
    cell: ({row: {original}}) =>  original.totalOfProducts ,
  },
  {
    accessorKey: "productsAmount",
    header: "Valor Total ",
    cell: ({row: {original }}) => transformCurrency(Number(original.productsAmount))  ,
  },
  {
    accessorKey: "",
    header: "Data da Venda ",
    cell: () => new Date().toLocaleDateString("pt-BR"),
  },
  {
    accessorKey: "acoes",
    header: "Ações",
    cell: (row) => {
      return (
        <Button></Button>
      );
    },
  },
];
