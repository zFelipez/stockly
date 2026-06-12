import z from 'zod' ; 

export const createSaleSchema = z.object({
    products :  z.array( z.object({
        id : z.string().uuid(),
        quantity: z.number().positive().int(),
        //nao se recebe preço pelo frontend 
    }))
})



export type CreateSaleSchema = z.infer<typeof createSaleSchema> ;