import { MovieType } from "@/types/movies-response";
import { Image, Skeleton } from "@nextui-org/react";
import Link from "next/link";
import React, { RefObject } from "react";

interface MovieCardProps {
  movie?: MovieType;
  movieCardRef?: RefObject<HTMLLIElement>;
}

export default function MovieCard(props: MovieCardProps) {
  const { movie, movieCardRef } = props;
  return movie ? (
    <li
      ref={movieCardRef}
      key={movie.id}
      className="w-72 snap-center overflow-hidden flex-shrink-0"
    >
      <Link href={"#"} className="relative w-full h-full">
        <div className="overflow-hidden rounded-xl">
          <Image
            removeWrapper
            alt="Movie poster"
            className="w-full h-full object-cover hover:scale-105"
            src={`${
              process.env.NEXT_PUBLIC_TMDB_IMAGES
            }/t/p/w500/${movie.poster_path!}`}
          />
        </div>
        <div>
          <h3 className="font-bold">{movie.title}</h3>
          <div className="flex justify-between">
            <p className="text-tiny">{movie.release_date}</p>
            <p className="text-tiny">⭐{movie.vote_average.toFixed(1)}</p>
          </div>
        </div>
      </Link>
    </li>
  ) : (
    <li ref={movieCardRef} className="flex-shrink-0 rounded-xl space-y-2">
      <Skeleton className="w-72 h-[432px] rounded-xl" />
      <Skeleton className="w-72 h-4 rounded-xl" />
    </li>
  );
}
