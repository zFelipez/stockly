import z from "zod";

export const deleteIdSchema = z.object({
    id: z.string().uuid()
})

export type DeleteIdSchema = z.infer<typeof deleteIdSchema>