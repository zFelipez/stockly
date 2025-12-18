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
import {
  ClipboardCopyIcon,
  DeleteIcon,
  MoreHorizontalIcon,
} from "lucide-react";

interface SalesTableDropwdownMenuProps {
  product: Pick<Product, "id">;
  onDelete: (productId: string) => void;
}

export const SalesTableDropwdownMenu = ({
  product,onDelete,
}: SalesTableDropwdownMenuProps) => {
  return (
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
          onClick={() => navigator.clipboard.writeText(product.id)}
        >
          <ClipboardCopyIcon size={16}> </ClipboardCopyIcon>
          Copiar Id
        </DropdownMenuItem>

        <DropdownMenuItem className=" gap-1.5" onClick={() => onDelete(product.id)}>
          <DeleteIcon size={16}>
            {" "}
          </DeleteIcon>
          Deletar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
