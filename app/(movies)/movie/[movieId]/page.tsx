import MovieSerieDetails from "@/components/MovieSerieDetails";
import { api } from "@/lib/AxiosConfig";
import { MovieDetailsSchema } from "@/types/movie-details-response";
import { MoviesRecommendationSchema } from "@/types/movie-recommendations-response";
import { redirect } from "next/navigation";

async function getMovie(movieId: string) {
  const url = `/3/movie/${movieId}`;
  try {
    const res = await api(url);
    if (res.status !== 200) throw new Error("Error fetching movie data");
    const result = MovieDetailsSchema.safeParse(res.data);
    if (!result.success) throw new Error("Error parsing movie data")
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

async function getMovieRecommendation(movieId: string) {
  const url = `/3/movie/${movieId}/recommendations`;
  try {
    const res = await api(url);
    if (res.status !== 200) throw new Error("Error fetching movie recommendations data");
    const result = MoviesRecommendationSchema.safeParse(res.data);
    if (!result.success) throw new Error("Error parsing recommendation data")
    return result.data?.results;
  } catch (error) {
    console.log(error);
  }
}

export default async function Page({params}: {params: { movieId: string }}) {
  const { movieId } = params;
  const [item, recommendations] = await Promise.all([getMovie(movieId), getMovieRecommendation(movieId)])
  
  if (!item) return redirect("/")
  
  return (
    <MovieSerieDetails uknownItem={item} uknownRecommendations={recommendations} />
  );
}
