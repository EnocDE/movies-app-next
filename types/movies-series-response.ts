import z from "zod"

export const VisualContentDataSchema = z.object({
  page: z.number(),
  total_pages: z.number(),
  total_results: z.number()
})