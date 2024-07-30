"use client";
import MenuSelectionHeader from "@/components/MenuSelectionHeader";
import MoviesList from "@/components/MoviesList";
import { api } from "@/lib/AxiosConfig";
import { MoviesSchema, MovieType } from "@/types/movies-response";
import { SeriesSchema, SerieType } from "@/types/series-response";
import { useEffect, useState } from "react";
import { MoviesTrendingMenuSelection } from "./data";
import GenreSlider from "@/components/GenreSlider";

export default function MoviesAndSeries() {
  const [option, setOption] = useState<"movie" | "tv">("tv");
  const [items, setItems] = useState<MovieType[] | SerieType[] | undefined>();
  const [genre, setGenre] = useState<number | undefined>(undefined);

  useEffect(() => {
    (async () => {
      setGenre(undefined)
      const url = process.env.NEXT_PUBLIC_TMDB_URL + "/3/discover/" + option;
      try {
        const res = await api(url);
        if (res.status !== 200)
          throw new Error("Error fetching movie or series data");
        let result;
        option === "movie"
          ? (result = MoviesSchema.safeParse(res.data))
          : (result = SeriesSchema.safeParse(res.data));
        if (!result.success)
          throw new Error("Error parsing movie or series data");
        setItems(result.data.results);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [option]);

  const filterItems = () => {
    let filteredItems: MovieType[] | SerieType[] = items || []
    if (genre) {
      //@ts-ignore
      filteredItems = filteredItems?.filter(item => item.genre_ids.includes(genre))
    }
    return filteredItems
  } 

  const filteredItems = filterItems()

  return (
    <div>
      <MenuSelectionHeader
        menuSelectionData={MoviesTrendingMenuSelection}
        optionState={option}
        setOptionState={setOption}
      />
      <GenreSlider currentGenre={genre} setGenre={setGenre} type={option} />
      <MoviesList movies={filteredItems} />
    </div>
  );
}
