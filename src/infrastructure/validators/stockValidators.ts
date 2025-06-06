import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const StockSchema = z.object({
  id: z
    .string()
    .uuid()
    .openapi({ example: "550e8400-e29b-41d4-a716-446655440000" }),
  reward_id: z
    .string()
    .uuid()
    .openapi({ example: "550e8400-e29b-41d4-a716-446655440000" }),
  quantity: z
    .number()
    .int({ message: "El número debe ser entero" })
    .refine((val) => val !== 0, {
      message: "El número no puede ser 0",
    })
    .openapi({ example: 0 }),
  created_at: z.date().openapi({ example: "2025-04-15T21:16:10.095Z" }),
  updated_at: z.date().openapi({ example: "2025-04-15T21:16:10.095Z" }),
});

export const CreateStockSchema = StockSchema.omit({ id: true, created_at: true, updated_at: true });
export const CreateStockResponseSchema = z.object({
  message: z.string(),
  id: StockSchema.shape.id,
});
