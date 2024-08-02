"use client";
import GenreSlider from "@/components/GenreSlider";
import ItemsList from "@/components/ItemsList";
import MenuSelectionHeader from "@/components/MenuSelectionHeader";
import { api } from "@/lib/AxiosConfig";
import { MenuSelectionType } from "@/types/menu-selection";
import { MoviesSchema, MovieType } from "@/types/movies-response";
import { useEffect, useState } from "react";
import { MoviesTrendingMenuSelection } from "./data";

export default function MoviesTrending() {
  const [trend, setTrend] = useState<MenuSelectionType["type"]>("now_playing");
  const [movies, setMovies] = useState<MovieType[]>();
  const [genre, setGenre] = useState<number | undefined>();

  useEffect(() => {
    (async () => {
      const filters = `?adults=false`;
      const url = `${process.env.NEXT_PUBLIC_TMDB_URL}/3/movie/${trend}${filters}`;
      setGenre(undefined);
      try {
        const response = await api(url);
        if (response.status !== 200)
          throw new Error("Error fetching movies on trending");
        const result = MoviesSchema.safeParse(response.data);
        if (!result.success)
          throw new Error("Error parsing movies on trending data");
        setMovies(result?.data?.results);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [trend]);

  const filterByGenre = () => {
    if (genre && movies?.length) {
      return movies.filter((movie) => movie.genre_ids.includes(genre));
    } else {
      return movies;
    }
  };

  const filteredMovies = filterByGenre();

  return (
    <section>
      <MenuSelectionHeader
        setOptionState={setTrend}
        optionState={trend}
        menuSelectionData={MoviesTrendingMenuSelection}
      />
      <GenreSlider type="movie" setGenre={setGenre} currentGenre={genre} />
      <ItemsList uknownItems={filteredMovies} />
    </section>
  );
}
