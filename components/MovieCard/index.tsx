import { MovieType } from "@/types/movies-response";
import { SerieType } from "@/types/series-response";
import { defaultPoster, truncateRating } from "@/utils";
import { Button, Image, Skeleton } from "@nextui-org/react";
import Link from "next/link";
import React, { RefObject } from "react";

interface MovieCardProps {
  movie?: MovieType | SerieType;
  movieCardRef?: RefObject<HTMLLIElement>;
}

export default function MovieCard(props: MovieCardProps) {
  const { movie, movieCardRef} = props;

  const handleAddToFavorites = ( e: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
    e.stopPropagation();
    console.log("Añadiendo a favoritos");
  };

  const isMovie = (movie: MovieType | SerieType): movie is MovieType => {
    return (movie as MovieType).title !== undefined;
  };
  const posterPath = movie?.poster_path ? `${process.env.NEXT_PUBLIC_TMDB_IMAGES}/t/p/w500/${movie.poster_path}` : defaultPoster

  return movie ? (
    <li
      ref={movieCardRef || null}
      key={movie.id}
      className="w-72 snap-center flex-shrink-0"
    >
      <div className="relative rounded-xl group">
        <Image
          removeWrapper
          className={`h-[432px] ${!movie.poster_path ? "object-cover" : ""}`}
          alt="Movie poster"
          src={posterPath}
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 p-5 group-hover:opacity-100 z-10 text-white rounded-xl backdrop-blur-md transition-all flex flex-col">
          <Link href={`${isMovie(movie) ? "/movie/" : "/serie/"}${movie.id}`}>
            <h3 className="font-bold mb-5">
              {isMovie(movie) ? movie.title : movie.name}
            </h3>
          </Link>
          <p className="text-tiny mb-3 text-neutral-300 text-ellipsis line-clamp-[17]">
            {movie.overview}
          </p>
          <div className="flex justify-between gap-5 flex-1">
            <Button className="flex-1 self-end" onClick={handleAddToFavorites}>
              Favorites
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Link href={`/${isMovie(movie) ? "movie" : "serie"}/${movie.id}`}>
          <h3 className="font-bold">
            {isMovie(movie) ? movie.title : movie.name}
          </h3>
        </Link>
        <div className="flex justify-between">
          <p className="text-tiny">
            {isMovie(movie) ? movie.release_date : movie.first_air_date}
          </p>
          <p className="text-tiny">⭐{truncateRating(movie.vote_average)}</p>
        </div>
      </div>
    </li>
  ) : (
    <li ref={movieCardRef} className="flex-shrink-0 rounded-xl space-y-2">
      <Skeleton className="w-72 h-[432px] rounded-xl" />
      <Skeleton className="w-72 h-4 rounded-xl" />
    </li>
  );
}
