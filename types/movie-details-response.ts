import z from "zod"
import { MovieSchema } from "./movies-response"

export const SpokenLanguagesSchema = z.object({
  english_name: z.string(),
  iso_639_1: z.string(),
  name: z.string()
})

export const ProductionCountriesSchema = z.object({
  iso_3166_1: z.string(),
  name: z.string()
})

export const ProductionCompaniesSchema = z.object({
  id: z.number(),
  logo_path: z.string().nullish(),
  name: z.string(),
  origin_country: z.string()
})

export const GenresSchema = z.object({
  id: z.number(),
  name: z.string()
})

export const BelogToCollectionSchema = z.object({
  id: z.number(),
  name: z.string(),
  poster_path: z.string().nullish(),
  backdrop_path: z.string().nullish()
})

export const MovieDetailsSchema = MovieSchema.pick({
  adult: true,
  backdrop_path: true,
  id: true,
  overview: true,
  original_language: true,
  original_title: true,
  popularity: true,
  poster_path: true,
  vote_average: true,
  vote_count: true,
  video: true,
  title: true
}).extend({
  belongs_to_collection: BelogToCollectionSchema.nullish(),
  budget: z.number(),
  genres: z.array(GenresSchema),
  homepage: z.string(),
  imdb_id: z.string().nullish(),
  origin_country: z.array(z.string()),
  popularity: z.number(),
  production_companies: z.array(ProductionCompaniesSchema),
  production_countries: z.array(ProductionCountriesSchema),
  release_date: z.string(),
  revenue: z.number(),
  runtime: z.number(),
  spoken_languages: z.array(SpokenLanguagesSchema),
  status: z.string(),
  tagline: z.string(),
})

export type MovieDetailsType = z.infer<typeof MovieDetailsSchema>
