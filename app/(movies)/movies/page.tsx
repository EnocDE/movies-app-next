import AllMoviesSeries from "@/components/AllMoviesSeries";
import Filters from "@/components/Filters";
import { api } from "@/lib/AxiosConfig";
import { MoviesSchema } from "@/types/movies-response";
import { redirect } from "next/navigation";

async function getMovies({ page }: { page: string }) {
  const url = `/3/discover/movie?page=${page}&adults=false`;
  try {
    const response = await api(url);
    if (response.status !== 200) throw new Error("Error fetching movies data");
    const result = MoviesSchema.safeParse(response.data);
    if (!result.success) throw new Error("Error parsing series data");
    return result.data?.results;
  } catch (error) {
    console.log(error);
  }
}

export default async function Page(params: {searchParams: {page?: string, stars?: string, order?: string, year?: string}}) {
  const page = params.searchParams.page || "1"

  if (+page > 500) return redirect("/movies")
  const items = await getMovies({page})

  const filterItems = () => {
    let filterItems = items
    
    if (params.searchParams.order) {
      params.searchParams.order === "ASC" 
      ? filterItems = filterItems?.toSorted((a, b) => a.title.localeCompare(b.title))
      : filterItems = filterItems?.toSorted((a, b) => b.title.localeCompare(a.title))
    }
    if (params.searchParams.stars) {
      filterItems = filterItems?.filter(item => item.vote_average > +params.searchParams.stars!)
    }
    if (params.searchParams.year && params.searchParams.year !== "All") {
      filterItems = filterItems?.filter(item => new Date(item.release_date) > new Date(params.searchParams.year!))
    }

    return filterItems
  }

  const filteredItems = filterItems()

  return (
    <>
      <Filters />
      <AllMoviesSeries uknownItems={filteredItems} />
    </>
  )
}
