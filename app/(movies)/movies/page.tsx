import AllMoviesSeries from "@/components/AllMoviesSeries";
import { api } from "@/lib/AxiosConfig";
import { MoviesSchema } from "@/types/movies-response";
import { redirect } from "next/navigation";

async function getMovies({ page }: { page: string }) {
  const url = `/3/discover/movie?page=${page}`;
  try {
    const response = await api(url);
    if (response.status !== 200) throw new Error("Error fetching movies data");
    const result = MoviesSchema.safeParse(response.data);
    console.log(result.error?.issues);
    
    if (!result.success) throw new Error("Error parsing series data");
    return result.data?.results;
  } catch (error) {
    console.log(error);
  }
}

export default async function Page(params: {searchParams: {page?: string}}) {
  const page = params.searchParams.page || "1"
  if (+page > 500) return redirect("/movies")
  const items = await getMovies({page})

  return (
    <AllMoviesSeries uknownItems={items} />
  )
}
