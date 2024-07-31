import z from "zod"
import { MoviesSchema } from "./movies-response"

export const MoviesNowPlayingDatesSchema = z.object({
  maximum: z.string(),
  minimum: z.string()
})

export const MoviesNowPlayingSchema = MoviesSchema.pick({
  page: true,
  results: true,
  total_pages: true,
  total_results: true,
}).extend({
  dates: MoviesNowPlayingDatesSchema
})

