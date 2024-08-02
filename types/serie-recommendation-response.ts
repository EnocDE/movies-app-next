import z from "zod"
import { VisualContentDataSchema } from "./movies-series-response"

const SerieRecommendationSchema = z.object({
  backdrop_path: z.string().nullish(),
  id: z.number(),
  name: z.string(),
  original_name: z.string(),
  overview: z.string(),
  poster_path: z.string().nullish(),
  media_type: z.string(),
  adult: z.boolean(),
  original_language: z.string(),
  genre_ids: z.array(z.number()),
  popularity: z.number(),
  first_air_date: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
  origin_country: z.array(z.string())
})

export const SerieRecommendationsSchema = VisualContentDataSchema.pick({
  page: true,
  total_pages: true,
  total_results: true
}).extend({
  results: z.array(SerieRecommendationSchema)
})

export type SerieRecommendationsSchema = z.infer<typeof SerieRecommendationsSchema>