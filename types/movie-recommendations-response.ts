import z, { array } from "zod"
import { VisualContentDataSchema } from "./movies-series-response"
import { MovieSchema } from "./movies-response"

export const MovieRecommendationSchema = MovieSchema.pick({
  backdrop_path: true,
  id: true,
  title: true,
  original_title: true,
  overview: true,
  poster_path: true,
  adult: true,
  genre_ids: true,
  popularity: true,
  release_date: true,
  video: true,
  vote_average: true, 
  vote_count: true,
  original_language: true,
}).extend({
  media_type: z.string().nullish(),
})

export const MoviesRecommendationSchema = VisualContentDataSchema.pick({
  page: true,
  total_pages: true,
  total_results: true
}).extend({
  results: array(MovieRecommendationSchema)
})

export type MovieRecommendationType = z.infer<typeof MovieRecommendationSchema>
export type MoviesRecommendationType = z.infer<typeof MoviesRecommendationSchema>