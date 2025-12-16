import z from "zod";

export const upsertProductSchema = z.object({
  id : z.string().uuid().optional(), 
  name: z.string().trim().min(1, { message: "Nome do Produto é obrigatório" }),
  price: z
    .number()
    .positive({ message: "Preço do Produto é obrigatório" })
    .min(0.01, { message: "Preço deve ser maior que zero" }),
  stock: z.coerce
    .number()
    .positive({ message: "A quantidade do estoque é obrigatória" })
    .int({ message: "Estoque deve ser um número inteiro" })
    .min(1, { message: "Estoque deve ser no mínimo 1" }),
});

export type UpsertProductSchema = z.infer<typeof upsertProductSchema>;