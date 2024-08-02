import { api } from "@/lib/AxiosConfig";
import { GenresSchema, GenreType } from "@/types/gender-response";
import { MenuSelectionType } from "@/types/menu-selection";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface GenreSliderProps {
  type: MenuSelectionType["type"];
  setGenre: Dispatch<SetStateAction<number | undefined>>;
  currentGenre: number | undefined;
}

export default function GenreSlider(props: GenreSliderProps) {
  const { type, setGenre, currentGenre } = props;
  const [genres, setGenres] = useState<GenreType[]>();

  useEffect(() => {
    (async () => {
      const url = `${process.env.NEXT_PUBLIC_TMDB_URL}/3/genre/${type}/list`;
      try {
        const response = await api(url);
        if (response.status !== 200)
          throw new Error("Error fetching movies on trending");
        const result = GenresSchema.safeParse(response.data);
        if (!result.success)
          throw new Error("Error parsing movies on trending data");
        setGenres(result.data.genres);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [type]);

  const genreItemRef = useRef<HTMLLIElement>(null);
  const genreListRef = useRef<HTMLUListElement>(null);
  const genreContainerRef = useRef<HTMLDivElement>(null);
  const slideGenreListToRight = () => {
    if (genreListRef.current && genreItemRef.current) {
      const widthItem = genreItemRef.current.offsetWidth;
      genreListRef.current.scrollBy({
        left: widthItem,
        behavior: "smooth",
      });
    }
  };

  const slideGenreListToLeft = () => {
    if (genreListRef.current && genreItemRef.current) {
      const widthItem = genreItemRef.current.offsetWidth;
      genreListRef.current.scrollBy({
        left: -widthItem,
        behavior: "smooth",
      });
    }
  };

  const handleSetGenre = (value: number) => setGenre(value);

  return (
    <div ref={genreContainerRef} className="my-10 max-w-[80%] mx-auto relative">
      <div className="overflow-hidden scroll-smooth">
        <ul
          ref={genreListRef}
          className="flex justify-evenly flex-nowrap snap overflow-x-auto disable-scrollbar gap-5 snap-proximity snap-x rounded-md"
        >
          {genres?.length ? (
            genres.map((genre) => (
              <li
                ref={genreItemRef}
                key={genre.id}
                className={`block p-2 flex-shrink-0 w-fit md:w-[120px] lg:w-[200px] py-2 text-center text-nowrap bg-red-600 text-white rounded-full snap-center hover:cursor-pointer transition-transform select-none ${
                  currentGenre === genre.id ? "bg-red-800" : ""
                }`}
                onClick={() => handleSetGenre(genre.id)}
              >
                {genre.name}
              </li>
            ))
          ) : (
            <p>Cargando</p>
          )}
        </ul>
      </div>
      <button
        onClick={slideGenreListToLeft}
        className="hidden md:block absolute top-[50%] -left-7 -translate-y-[50%] font-bold text-2xl hover:scale-125 transition-transform"
      >
        {"<-"}
      </button>
      <button
        onClick={slideGenreListToRight}
        className="hidden md:block absolute top-[50%] -right-7 -translate-y-[50%] font-bold text-2xl hover:scale-125 transition-transform"
      >
        {"->"}
      </button>
    </div>
  );
}
