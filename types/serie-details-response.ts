import z from "zod";
import { SerieSchema } from "./series-response";

const SpokenLanguageSchema = z.object({
  english_name: z.string(),
  iso_639_1: z.string(),
  name: z.string(),
});

const SeasonSchema = z.object({
  air_date: z.string().nullish(),
  episode_count: z.number(),
  id: z.number(),
  name: z.string(),
  overview: z.string(),
  poster_path: z.string().nullish(),
  season_number: z.number(),
  vote_average: z.number(),
});

const ProductionCountrySchema = z.object({
  iso_3166_1: z.string(),
  name: z.string(),
});

const ProductionCompanySchema = z.object({
  id: z.number(),
  logo_path: z.string().nullish(),
  name: z.string(),
  origin_country: z.string(),
});

const NetworkSchema = z.object({
  id: z.number(),
  logo_path: z.string(),
  name: z.string(),
  origin_country: z.string(),
});

const EpisodeSchema = z.object({
  id: z.number(),
  name: z.string(),
  overview: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
  air_date: z.string(),
  episode_number: z.number(),
  episode_type: z.string(),
  production_code: z.string(),
  runtime: z.number().nullish(),
  season_number: z.number(),
  show_id: z.number(),
  still_path: z.string().nullish(),
});

const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const CreatedBySchema = z.object({
  id: z.number(),
  credit_id: z.string(),
  name: z.string(),
  original_name: z.string(),
  gender: z.number(),
  profile_path: z.string().nullish(),
});

export const SerieDetailsSchema = SerieSchema.pick({
  adult: true,
  backdrop_path: true,
  first_air_date: true,
  id: true,
  name: true,
  origin_country: true,
  original_language: true,
  original_name: true,
  overview: true,
  popularity: true,
  poster_path: true,
  vote_average: true,
  vote_count: true,
}).extend({
  created_by: z.array(CreatedBySchema),
  episode_run_time: z.array(z.number()),
  genres: z.array(GenreSchema),
  homepage: z.string(),
  in_production: z.boolean(),
  languages: z.array(z.string()),
  last_air_date: z.string(),
  last_episode_to_air: EpisodeSchema.nullish(),
  next_episode_to_air: EpisodeSchema.nullish(),
  networks: z.array(NetworkSchema),
  number_of_episodes: z.number(),
  number_of_seasons: z.number(),
  production_companies: z.array(ProductionCompanySchema),
  production_countries: z.array(ProductionCountrySchema),
  seasons: z.array(SeasonSchema),
  spoken_languages: z.array(SpokenLanguageSchema),
  status: z.string(),
  tagline: z.string(),
  type: z.string(),
});

export type SerieDetailType = z.infer<typeof SerieDetailsSchema>