"use client";
 
import { Badge } from "@/app/_components/ui/badge";
 
 
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  CircleIcon,
 
} from "lucide-react";
 
import { ActionsCell } from "./actions-cell";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

const getStatusLabel = (status: string) => {
  if (status === "IN_STOCK") {
    console.log(status);
    return "Em estoque";
  }
  console.log(status);
  return "Fora de Estoque";
};
export const productsTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Produto ",
  },
  {
    accessorKey: "price",
    header: "Valor Unitario",
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "status",
    cell: (row) => {
      const product = row.row.original;
      const label = getStatusLabel(product.status);

      console.log(label);
      return (
        <Badge
          variant={label === "Em estoque" ? "default" : "destructive"}
          className="gap-1.5"
        >
          <CircleIcon
            size={14}
            className={
              label === "Em estoque"
                ? "fill-primary-foreground"
                : "fill-destructive-foreground"
            }
          ></CircleIcon>
          {label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "acoes",
    header: "Ações",
    cell: (row) => {
    
     
      return (
          <ActionsCell name={row.row.original.name} id={row.row.original.id} price={row.row.original.price} stock={row.row.original.stock}></ActionsCell>
      );
    },
  },
];
