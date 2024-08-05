import z from "zod"
import { VisualContentDataSchema } from "./movies-series-response"

export const SerieSchema = z.object({
  "adult": z.boolean(),
  "backdrop_path": z.string().nullish(),
  "genre_ids": z.array(z.number()),
  "id": z.number(),
  "origin_country": z.array(z.string()),
  "original_language": z.string(),
  "original_name": z.string(),
  "overview": z.string(),
  "popularity": z.number(),
  "poster_path": z.string().nullish(),
  "first_air_date": z.string(),
  "name": z.string(),
  "vote_average": z.number(),
  "vote_count": z.number()
})

export const SeriesSchema = VisualContentDataSchema.pick({
  page: true,
  total_pages: true,
  total_results: true
}).extend({
  results: z.array(SerieSchema)
})

export type SerieType = z.infer<typeof SerieSchema>
export type SeriesType = z.infer<typeof SeriesSchema>