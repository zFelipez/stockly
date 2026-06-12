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
import { Product } from "@prisma/client";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { deleteSaleAction } from "@/app/_actions/sale/delete-sale";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { SelectedProducts, UpsertSheetContent } from "./upsert-sheet-content";
import { useState } from "react";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { SalesDto } from "@/app/_data-access/sale/get-sales";

type ActionsCellProps = {
  sale: Pick<SalesDto, "id" | "saleProducts">;
  products: Product[];
  productsOptions: ComboboxOption[];
};

export function SaleActionsCell({
  sale,
  products,
  productsOptions,
}: ActionsCellProps) {
  const [upsertSheetIsOpen, setUpsertSheetIsOpen] = useState<boolean>(false);

  const defaultSelectedProducts: SelectedProducts[] = sale.saleProducts.map(
    (saleProduct) => ({
      id: saleProduct.productId,
      name: saleProduct.product.name,
      price: Number(saleProduct.unitPrice),
      quantity: saleProduct.quantity,
    }),
  );

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
    await executeDeleteSale({ id: sale.id });
  }

  return (
    <Sheet open={upsertSheetIsOpen} onOpenChange={setUpsertSheetIsOpen}>
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

            <SheetTrigger asChild>
              <DropdownMenuItem className=" gap-1.5">
                <EditIcon size={16}> </EditIcon>
                Editar
              </DropdownMenuItem>
            </SheetTrigger>

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

      <UpsertSheetContent
        saleId={sale.id}
        setSheetOpen={setUpsertSheetIsOpen}
        products={products}
        product={productsOptions}
        defaultSelectedProducts={defaultSelectedProducts}
      ></UpsertSheetContent>
    </Sheet>
  );
}
