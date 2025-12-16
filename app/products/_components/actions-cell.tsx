"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import {
  ClipboardCopyIcon,
  DeleteIcon,
  EditIcon,
  MoreHorizontalIcon,
} from "lucide-react";
 
import UpsertProductDialogContent from "./upsert-dialog-content";
import { DeleteProductDialogContent } from "./delete-dialog-content";
import { Decimal } from "@prisma/client/runtime/client";
 
type ActionsCellProps = {
  name: string;
  id: string;
  price: Decimal;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export function ActionsCell({ name, id, price, stock }: ActionsCellProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  return (
    <AlertDialog>
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontalIcon size={16}></MoreHorizontalIcon>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>Ações </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-1.5"
              onClick={() => navigator.clipboard.writeText(id)}
            >
              <ClipboardCopyIcon size={16}> </ClipboardCopyIcon>
              Copiar Id
            </DropdownMenuItem>

            <DialogTrigger asChild>
              <DropdownMenuItem className=" gap-1.5">
                <EditIcon size={16}> </EditIcon>
                Editar
              </DropdownMenuItem>
            </DialogTrigger>

            <AlertDialogTrigger>
              <DropdownMenuItem className=" gap-1.5">
                <DeleteIcon size={16}> </DeleteIcon>
                Deletar
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <UpsertProductDialogContent
          defautlValues={{
            id: id,
            name: name,
            price: Number(price),
            stock: Number(stock),
          }}

          setDialogIsOpen={setEditDialogOpen}
        />
        <DeleteProductDialogContent productId={ id} />
      </Dialog>
    </AlertDialog>
  );
}
