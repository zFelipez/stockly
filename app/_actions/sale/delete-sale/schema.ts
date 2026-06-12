import { z } from "zod";

export const deleteSaleIdSchema = z.object({
  id: z.string().uuid(),
});

export type DeleteSaleIdSchema = z.infer<typeof deleteSaleIdSchema>;
