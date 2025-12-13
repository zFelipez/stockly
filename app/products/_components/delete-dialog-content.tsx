import { deleteProduct } from "@/app/_actions/product/delete-products";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { toast } from "sonner";

interface DeleteProductDialogContent {
  productId: string;
}

export const DeleteProductDialogContent = ({productId}: DeleteProductDialogContent) => {
 
  const handleConfirmClick = async () => {
    try {
      await deleteProduct( {id : productId});
      toast.success("Produto deletado com sucesso");
    } catch (err) {
      console.log(err);
      toast.error("Erro ao deletar produto");
    }
  };

  return (
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
        <AlertDialogAction onClick={handleConfirmClick}>Confirmar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
