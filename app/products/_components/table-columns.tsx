"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  CircleIcon,
  ClipboardCopyIcon,
  DeleteIcon,
  EditIcon,
  Ghost,
  MoreHorizontalIcon,
} from "lucide-react";

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
      const product = row.row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontalIcon size={16}></MoreHorizontalIcon>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className=" bg-yellow-200">
            <DropdownMenuLabel>Ações </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-1.5"
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              <ClipboardCopyIcon size={16}> </ClipboardCopyIcon>
              Copiar Id
            </DropdownMenuItem>

            <DropdownMenuItem className=" gap-1.5">
              <EditIcon size={16}> </EditIcon>
              Editar
            </DropdownMenuItem >

            <DropdownMenuItem className=" gap-1.5">

              <DeleteIcon size={16 }> </DeleteIcon>
               Deletar
            </DropdownMenuItem>
             
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
