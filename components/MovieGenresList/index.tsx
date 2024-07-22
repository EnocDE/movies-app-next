import { api } from "@/lib/AxiosConfig";
import { GenresSchema, GenresType, GenreType } from "@/types/gender-response";
import MovieGenreTag from "../MovieGenreTag";

interface MoviesGenresListProps {
  genre_ids: GenreType["id"][];
}

async function getMoviesGender() {
  try {
    const url = "/3/genre/movie/list";
    const response = await api(url);
    if (response.status !== 200)
      throw new Error("Error fetching movies genres data");
    const result = GenresSchema.safeParse(response.data);
    if (!result.success) throw new Error("Error parsing genres data");

    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export default async function MovieGenresList(props: MoviesGenresListProps) {
  const { genre_ids } = props;
  const { genres } = await getMoviesGender() as GenresType;
  return (
    <div className="mt-3 flex flex-wrap gap-3">
      {genre_ids.map((genre) => (
        <MovieGenreTag key={genre} genreId={genre} genres={genres} />
      ))}
    </div>
  );
}
