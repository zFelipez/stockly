import z from 'zod' ; 

export const createSaleSchema = z.object({
    saleId : z.string().uuid().optional(), // para identificar se é uma criação ou atualização de venda
    products :  z.array( z.object({
        id : z.string().uuid(),
        quantity: z.number().positive().int(),
        //nao se recebe preço pelo frontend 
    }))
})



export type CreateSaleSchema = z.infer<typeof createSaleSchema> ;