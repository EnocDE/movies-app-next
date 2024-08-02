import z from "zod"
import { VisualContentDataSchema } from "./movies-series-response"

export const MovieSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullish(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullish(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number()
})

export const MoviesResultsSchema = z.array(MovieSchema)

export const MoviesSchema = VisualContentDataSchema.pick({
  page: true,
  total_pages: true,
  total_results: true,
}).extend({
  results: MoviesResultsSchema
})

export type MovieType = z.infer<typeof MovieSchema>
export type MoviesType = z.infer<typeof MoviesSchema>

