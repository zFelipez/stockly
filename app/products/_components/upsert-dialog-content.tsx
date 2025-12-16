'use client'

import { DialogContent } from "@/app/_components/ui/dialog";
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
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/app/_components/ui/dialog";
import { NumericFormat } from "react-number-format";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { DialogClose } from "@/app/_components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpsertProductSchema,
  upsertProductSchema,
} from "@/app/_actions/product/upsert-product/schema";
 
import { upsertProduct } from "@/app/_actions/product/upsert-product/upsert-product";

type FormInput = {
  name: string;
  price: number;
  stock: unknown;
};


interface UpsertProductDialogContentProps {
  setDialogIsOpen?: (open: boolean) => void;
  defautlValues? :  UpsertProductSchema;
}

const UpsertProductDialogContent = ({  setDialogIsOpen, defautlValues}: UpsertProductDialogContentProps) => {
  

  const form = useForm<FormInput, unknown, UpsertProductSchema>({
    shouldUnregister: true,
    resolver: zodResolver(upsertProductSchema), // Integrando o Zod com o React Hook Form
    defaultValues: defautlValues ?? {
      name: "",
      price: 0,
      stock: 1,
    },
  });

  const onSubmit = async (data: UpsertProductSchema) => {
    try {
      await upsertProduct({...data ,  id: defautlValues?.id});
      setDialogIsOpen?.(false);
    } catch (err) {
      console.log(err);
    }
  };

  const isEditing = defautlValues ? true : false
  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <DialogHeader>
            <DialogTitle>{ isEditing  ? 'Editar Produto' : 'Criar Produto'}</DialogTitle>
            <DialogDescription>Insira as informações abaixo</DialogDescription>
          </DialogHeader>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Produto</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome do produto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço do Produto</FormLabel>
                <FormControl>
                  <NumericFormat
                    placeholder="Digite o preço do produto"
                    prefix="R$"
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={2}
                    allowNegative={false}
                    customInput={Input}
                    onValueChange={(values) => {
                      field.onChange(values.floatValue || 0);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estoque do Produto</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o estoque do produto"
                    {...field}
                    value={field.value as string | number | undefined}
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="reset">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="gap-1.5"
            >
              {form.formState.isSubmitting && (
                <Loader2Icon className="animate-spin" size={16}></Loader2Icon>
              )}
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpsertProductDialogContent;
