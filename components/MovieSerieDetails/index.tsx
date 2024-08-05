import { MovieDetailsSchema, MovieDetailsType } from "@/types/movie-details-response";
import { MoviesRecommendationSchema, MoviesRecommendationType } from "@/types/movie-recommendations-response";
import { SerieDetailType } from "@/types/serie-details-response";
import { SerieRecommendationsSchema } from "@/types/serie-recommendation-response";
import { defaultBackdrop, defaultPoster, truncateRating } from "@/utils";
import { Image } from "@nextui-org/react";
import DetailsGenresList from "../DetailsGenresList";
import ItemsList from "../ItemsList";

interface MovieSerieDetailsProps {
  uknownItem: unknown;
  uknownRecommendations: unknown
}

export default function MovieSerieDetails(props: MovieSerieDetailsProps) {
  const { uknownItem, uknownRecommendations } = props;
  let item : MovieDetailsType | SerieDetailType

  if (MovieDetailsSchema.safeParse(uknownItem).success) { 
    item = uknownItem as MovieDetailsType
  } else {
    item = uknownItem as SerieDetailType
  }

  let recommendations
  if (MoviesRecommendationSchema.safeParse(uknownRecommendations).success) {
    recommendations = uknownRecommendations as MoviesRecommendationType
  } else {
    recommendations = uknownRecommendations as SerieRecommendationsSchema
  }

  const isMovie = (item: MovieDetailsType | SerieDetailType): item is MovieDetailsType => {
    return (item as MovieDetailsType).title !== undefined
  }

  const itemBackdrop = item?.backdrop_path ? `${process.env.NEXT_PUBLIC_TMDB_IMAGES}/t/p/original${item?.backdrop_path}` : defaultBackdrop;
  const itemPoster = item?.poster_path ? `${process.env.NEXT_PUBLIC_TMDB_IMAGES}/t/p/w500${item?.poster_path}` : defaultPoster
  const itemName = isMovie(item) ? item?.original_title : item?.name
  const itemOriginalName = isMovie(item) ? item?.original_title : item?.original_name
  const itemGenres = item?.genres
  const itemOverview = item?.overview
  const itemVoteAverage = item?.vote_average
  const itemRuntime = isMovie(item) ? item?.runtime : item?.episode_run_time.reduce((acc, time) => acc += time, 0)
  const itemRelease = isMovie(item) ? item?.release_date : item?.first_air_date
  const itemCompanies = item?.production_companies
  const itemRecommendations = recommendations  

  return (
    <section
      className="w-full min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${itemBackdrop})`,
      }}
    >
      <div className="relative w-full h-full inset-0 to-black/10 bg-gradient-to-t via-black/50 from-black/90 flex flex-col">
        <main className="flex flex-col lg:flex-row justify-center items-center gap-10 text-white relative z-10 p-20">
          <div className="shadow-md">
            <Image
              className="w-full h-auto max-w-[500px] max-h-[700px]"
              src={itemPoster}
              alt="Poster Movie"
            />
          </div>
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold drop-shadow-md">{itemName}</h1>
            <h2 className="text-xl">{itemOriginalName}</h2>
            <DetailsGenresList genres={itemGenres} />
            <p className="max-w-2xl text-pretty">{itemOverview}</p>
            <div className="flex gap-5 mt-3 text-neutral-300 font-bold">
              <p>{truncateRating(itemVoteAverage)}</p>
              <p>{itemRuntime} min</p>
              <p>{itemRelease}</p>
            </div>
            <ul className="flex gap-5 mt-3 flex-wrap">
              {itemCompanies.map((company) =>
                company.logo_path != null ? (
                  <li
                    key={company.id}
                    className="bg-slate-200/30 p-2 rounded-xl h-fit backdrop-blur-sm"
                  >
                    <Image
                      className="max-h-12 rounded-none"
                      src={`${process.env.NEXT_PUBLIC_TMDB_IMAGES}/t/p/w500${company.logo_path}`}
                      alt={`${company.name} logo`}
                    />
                  </li>
                ) : null
              )}
            </ul>
          </div>
        </main>

        <section>
          <h3 className="text-3xl font-bold text-white mx-auto w-[90%] mb-5">Recommended movies</h3>
          <ItemsList
            uknownItems={itemRecommendations}
            classNames="text-white"
          />
        </section>
      </div>
    </section>
  );
}
