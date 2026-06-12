"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
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

import {
  ClipboardCopyIcon,
  DeleteIcon,
  EditIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import { Sale } from "@prisma/client";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { deleteSaleAction } from "@/app/_actions/sale/delete-sale";

type ActionsCellProps = {
  sale: Pick<Sale, "id">;
};

export function SaleActionsCell({ sale }: ActionsCellProps) {
  function handleCopyToClipBoard(id: string) {
    navigator.clipboard.writeText(id);
    toast.success("ID copiado para a area de transferencia com sucesso");
  }

  const { execute: executeDeleteSale } = useAction(deleteSaleAction, {
    onSuccess: () => {
      toast.success("Venda deletada com sucesso . ");
    },
    onError: () => {
      toast.error("Erro ao deletar Venda tente novamente. ");
    },
  });

  async function handleConfirmDeleteSale() {
    await executeDeleteSale(sale);
  }

  return (
    <AlertDialog>
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
            onClick={() => handleCopyToClipBoard(sale.id)}
          >
            <ClipboardCopyIcon size={16}> </ClipboardCopyIcon>
            Copiar Id
          </DropdownMenuItem>

          <DropdownMenuItem className=" gap-1.5">
            <EditIcon size={16}> </EditIcon>
            Editar
          </DropdownMenuItem>

          <AlertDialogTrigger>
            <DropdownMenuItem className=" gap-1.5">
              <DeleteIcon size={16}> </DeleteIcon>
              Deletar
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Voce tem certeza que deseja deletar?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso deletara permanentemente seu
            produto e removera seus dados de nossos servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmDeleteSale}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
