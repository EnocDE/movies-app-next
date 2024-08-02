"use client";

import { MoviesResultsSchema, MoviesSchema, MovieType } from "@/types/movies-response";
import { SerieType } from "@/types/series-response";
import { useRef } from "react";
import MovieCard from "../MovieCard";

interface MoviesListProps {
  movies: undefined | unknown;
  classNames?: string;
}

export default function MoviesList(props: MoviesListProps) {
  const { movies, classNames } = props;
  
  let items : SerieType[] | MovieType[];
  if (MoviesResultsSchema.safeParse(movies).success) {
    items = movies as MovieType[];
  } else {
    items = movies as SerieType[];
  }

  const movieCardRef = useRef<HTMLLIElement>(null);
  const moviesListRef = useRef<HTMLUListElement>(null);
  const movieListContainerRef = useRef<HTMLDivElement>(null);

  const slideMoviesListToRight = () => {
    if (moviesListRef.current && movieCardRef.current) {
      const widthCard = movieCardRef.current.offsetWidth + 40;
      moviesListRef.current.scrollBy({ left: widthCard, behavior: "smooth" });
    }
  };

  const slideMoviesListToLeft = () => {
    if (moviesListRef.current && movieCardRef.current) {
      const widthCard = movieCardRef.current.offsetWidth + 40;
      moviesListRef.current.scrollBy({ left: -widthCard!, behavior: "smooth" });
    }
  };


  return (
    <section>
      <div
        ref={movieListContainerRef}
        className={`relative after:block after:absolute after:inset-0 after:dark:bg-gradient-btt-h after:pointer-events-none after:z-10 ${classNames}`}
      >
        <ul
          ref={moviesListRef}
          className="w-full flex gap-5 overflow-x-auto disable-scrollbar snap-mandatory snap-x justify-items-center"
        >
          {items != null && items.length ? (
            items.map((item) => (
              <MovieCard
                key={item.id}
                movie={item as MovieType}
                movieCardRef={movieCardRef}
              />
            ))
          ) : (
            <>
              {Array.from({ length: 10 }).map((_, index) => (
                <MovieCard key={index} movieCardRef={movieCardRef} />
              ))}
            </>
          )}
        </ul>
        <button
          onClick={slideMoviesListToLeft}
          className="hidden md:block absolute left-10 top-[50%] -translate-y-[50%] z-10 font-bold text-white text-5xl p-5 hover:scale-90 ease-soft-spring transition-transform duration-500 drop-shadow-lg text-w-line"
        >
          {"<-"}
        </button>
        <button
          onClick={slideMoviesListToRight}
          className="hidden md:block absolute right-10 top-[50%] -translate-y-[50%] z-10 font-bold text-white text-5xl p-5 hover:scale-90 ease-soft-spring transition-transform duration-500 drop-shadow-lg text-w-line"
        >
          {"->"}
        </button>
      </div>
    </section>
  );
}
