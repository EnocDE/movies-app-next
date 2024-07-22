import ButtonWithLink from "@/components/ButtonWithLink";
import MovieGenresList from "@/components/MovieGenresList";
import { api } from "@/lib/AxiosConfig";
import { MovieType } from "@/types/movies-response";
import { MoviesNowPlayingSchema } from "@/types/now-playing-response";
import { defaultMoviePoster } from "@/utils";

async function getMainMovieInfo() {
  const page = Math.ceil(Math.random() * 2);
  const url = `/3/movie/now_playing?page=${page}`;
  try {
    const response = await api(url);
    if (response.status !== 200)
      throw new Error("Error fetching now playing data");
    const result = MoviesNowPlayingSchema.safeParse(response.data);
    if (!result.success) throw new Error("Error parsing main movie info data");

    return result.data.results[
      Math.ceil(Math.random() * result.data.results.length)
    ];
  } catch (error) {
    console.log(error);
  }
}

export default async function Hero() {
  const movie = await getMainMovieInfo() as MovieType;

  const vote_average = movie?.vote_average || "N/A";
  const original_title = movie?.original_title || "Uknown title";
  const overview = movie?.overview || "No description available";
  const backdrop_path = movie?.backdrop_path || false;
  const genre_ids = movie?.genre_ids || [];

  const bgUrl =
    (backdrop_path &&
      `${process.env.NEXT_PUBLIC_TMDB_IMAGES}/t/p/original${backdrop_path}`) || defaultMoviePoster;

  return (
    <main
      className={`flex items-center min-h-[500px] md:h-[800px] bg-cover bg-no-repeat bg-center relative after:block after:absolute after:inset-0 after:bg-black/30`}
      style={{
        backgroundImage: `url(${bgUrl})`,
      }}
    >
      <div className="p-5 py-10 md:p-32 text-white relative z-10 w-full">
        <h3 className="flex gap-3">⭐{vote_average || "not found"}</h3>
        <h1 className="text-2xl md:text-5xl font-bold mt-2">
          {original_title}
        </h1>
        <MovieGenresList genre_ids={genre_ids} />
        <p className="text-tiny mt-5 max-w-xl leading-5">{overview}</p>
        <div className="mt-10 space-y-3 md:space-x-5 max-w-[40%] md:w-full">
          <ButtonWithLink
            color="danger"
            name="Watch"
            url="#"
            classLink="block md:inline"
            classButton="w-full md:w-fit"
          />
          <ButtonWithLink
            name="Add list"
            url="#"
            classLink="block md:inline"
            classButton="w-full md:w-fit"
          />
        </div>
      </div>
    </main>
  );
}
