"use client";

import { Button } from "@/app/_components/ui/button";
import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/app/_components/ui/sheet";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { transformCurrency } from "@/app/_helpers/currency";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import { CheckIcon, PlusIcon } from "lucide-react";

import { Dispatch, SetStateAction, useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import z from "zod";
import { UpsertSalesTableDropwdownMenu } from "./upsert-sales-table-dropwdown-menu";
import { createSale } from "@/app/_actions/sale/create-sale";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { flattenValidationErrors } from "next-safe-action";

const formSchema = z.object({
  productId: z.string().uuid({ message: "Produto é obrigatório" }),
  quantity: z.coerce
    .number()
    .positive({ message: "A quantidade do estoque é obrigatória" })
    .int({ message: "Estoque deve ser um número inteiro" })
    .min(1, { message: "Estoque deve ser no mínimo 1" }),
});

type UpsertFormSchema = z.infer<typeof formSchema>;

type FormSchema = {
  productId: string;
  quantity: unknown;
};

type UpsertSalesDialogContentProps = {
  product: ComboboxOption[];
  products: Product[];
  setSheetOpen: Dispatch<SetStateAction<boolean>>;
};

type SelectedProducts = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export const UpsertSheetContent = ({
  product,
  products,
  setSheetOpen,
}: UpsertSalesDialogContentProps) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProducts[]>(
    [],
  );

  const { execute: executeCreateSale } = useAction(createSale, {
    onError: ({error : {validationErrors}}) => {
       const flattenedErrors =  flattenValidationErrors(validationErrors);

      console.log(flattenedErrors);
      toast.error(flattenedErrors.formErrors[0]);
    },
    onSuccess: () => {
      toast.success("Venda criada com sucesso");
      setSheetOpen(false); 
    },
  });

  const form = useForm<FormSchema, unknown, UpsertFormSchema>({
    shouldUnregister: true,
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });

  const totalProducts = useMemo(() => {
    return selectedProducts.reduce((acumulator, product) => {
      return acumulator + product.price * product.quantity;
    }, 0);
  }, [selectedProducts]);

  const onDelete = (productId: string) => {
    console.log(productId);
    return setSelectedProducts((products) => {
      return products.filter((product) => product.id !== productId);
    });
  };
  const onSubmit = (data: UpsertFormSchema) => {
    const selectedProduct = products.find(
      (product) => product.id === data.productId,
    );
    if (!selectedProduct) return;
    setSelectedProducts((currentProducts) => {
      const existingProduct = currentProducts.find(
        (product) => product.id === selectedProduct.id,
      );

      if (existingProduct) {
        const productIsOutOfStock =
          existingProduct.quantity > selectedProduct.stock;

        if (productIsOutOfStock) {
          form.setError("quantity", {
            message: "Qauntidade indisponivel em estoque",
          });

          return currentProducts;
        }
        form.reset();
        return currentProducts.map((item) => {
          if (item.id === data.productId) {
            return {
              ...item,
              quantity: item.quantity + data.quantity,
            };
          }
          return item;
        });
      }
      const productIsOutOfStock = data.quantity > selectedProduct.stock;

      if (productIsOutOfStock) {
        form.setError("quantity", {
          message: "Qauntidade indisponivel em estoque",
        });
      }
      form.reset();
      return [
        ...currentProducts,
        {
          ...selectedProduct,
          price: Number(selectedProduct.price),
          quantity: data.quantity,
        },
      ];
    });
  };

  const onSubmitSale = async () => {
    executeCreateSale({
      products: selectedProducts.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      })),
    });
  };

  return (
    <SheetContent className=" !max-w-[700px overflow-auto">
      <SheetHeader>
        <SheetTitle> Nova Venda </SheetTitle>
        <SheetDescription>
          Insira as informações da venda abaixo.
        </SheetDescription>
      </SheetHeader>

      <Form {...form}>
        <form
          className=" py-6 space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Produto</FormLabel>
                <FormControl>
                  <Combobox
                    {...field}
                    options={product}
                    placeholder=" Selecione um Produto"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantitdade </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Digite a quantidade de produto"
                    {...field}
                    value={field.value as string | number | undefined}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant={"secondary"} className=" w-full ">
            Adicionar produto a venda
            <PlusIcon />
          </Button>
        </form>
      </Form>
      <Table>
        <TableCaption>Lista de produtos adicionados a venda. </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Producto</TableHead>
            <TableHead>Preço Unitario </TableHead>
            <TableHead> Quantidade</TableHead>
            <TableHead> Total</TableHead>
            <TableHead> Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{transformCurrency(product.price)}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                {transformCurrency(product.price * product.quantity)}
              </TableCell>

              <TableCell>
                <UpsertSalesTableDropwdownMenu
                  product={product}
                  onDelete={onDelete}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell> {transformCurrency(totalProducts)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <SheetFooter className=" mt-4 w-full">
        <Button disabled={selectedProducts.length === 0} onClick={onSubmitSale}>
          <CheckIcon className=" mr-2" />
          Finalizar Venda
        </Button>
      </SheetFooter>
    </SheetContent>
  );
};
