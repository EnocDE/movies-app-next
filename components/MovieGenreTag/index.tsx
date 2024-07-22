import { GenresType, GenreType } from "@/types/gender-response";

interface MovieGenreTagProps {
  genreId: GenreType["id"]
  genres: GenreType[]
}

export default function MovieGenreTag(props: MovieGenreTagProps) {
  const {genreId, genres} = props
  return (
    <h4
      className="px-5 py-2 bg-slate-200/40 rounded-full text-tiny backdrop-blur-sm drop-shadow-sm "
    >
      {genres.map((genreList) => {
        if (genreList.id === genreId) return genreList.name;
      })}
    </h4>
  );
}
