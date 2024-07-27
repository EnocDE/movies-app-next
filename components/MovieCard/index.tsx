import { MovieType } from "@/types/movies-response";
import { truncateRating } from "@/utils";
import { Button, Image, Skeleton } from "@nextui-org/react";
import Link from "next/link";
import React, { RefObject } from "react";

interface MovieCardProps {
  movie?: MovieType;
  movieCardRef?: RefObject<HTMLLIElement>;
}

export default function MovieCard(props: MovieCardProps) {
  const { movie, movieCardRef } = props;

  const handleAddToFavorites = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    console.log("Añadiendo a favoritos");
  };

  const handleGoToMoviePage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    console.log("Abriendo pelicula");
  };

  return movie ? (
    <li
      ref={movieCardRef || null}
      key={movie.id}
      className="w-72 snap-center flex-shrink-0"
    >
      <div className="relative rounded-xl group">
        <Image
          removeWrapper
          alt="Movie poster"
          src={`${
            process.env.NEXT_PUBLIC_TMDB_IMAGES
          }/t/p/w500/${movie.poster_path!}`}
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 p-5 group-hover:opacity-100 z-10 text-white rounded-xl backdrop-blur-md transition-all flex flex-col">
          <Link href={`/movie/${movie.id}`}>
            <h3 className="font-bold mb-5">{movie.title}</h3>
          </Link>
          <p className="text-tiny text-neutral-300 text-pretty flex-1">
            {movie.overview}
          </p>
          <div className="flex justify-between gap-5">
            <Button className="flex-1" onClick={handleAddToFavorites}>
              ❤️
            </Button>
            <Button className="flex-1" onClick={handleGoToMoviePage}>
              ➕
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Link href={`/movie/${movie.id}`}>
          <h3 className="font-bold">{movie.title}</h3>
        </Link>
        <div className="flex justify-between">
          <p className="text-tiny">{movie.release_date}</p>
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
