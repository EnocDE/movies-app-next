import AllMoviesSeries from "@/components/AllMoviesSeries";
import { api } from "@/lib/AxiosConfig";
import { SeriesSchema } from "@/types/series-response";
import { redirect } from "next/navigation";

async function getSeries({ page }: { page: string }) {
  const url = `/3/discover/tv?page=${page}`;
  try {
    const response = await api(url);
    if (response.status !== 200) throw new Error("Error fetching movies data");
    const result = SeriesSchema.safeParse(response.data);
    if (!result.success) throw new Error("Error parsing series data");
    return result.data?.results;
  } catch (error) {
    console.log(error);
  }
}

export default async function Page(params: { searchParams: { page: string } }) {
  const page = params.searchParams.page || "1";
  if (+page > 500) return redirect("/series")
  const items = await getSeries({ page });

  return (
    <AllMoviesSeries uknownItems={items} />
  );
}

