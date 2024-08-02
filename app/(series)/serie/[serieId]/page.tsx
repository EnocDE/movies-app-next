import MovieSerieDetails from "@/components/MovieSerieDetails";
import { api } from "@/lib/AxiosConfig";
import {
  SerieDetailsSchema
} from "@/types/serie-details-response";
import { SerieRecommendationsSchema } from "@/types/serie-recommendation-response";
import { redirect } from "next/navigation";

async function getSerie(movieId: string) {
  const url = `/3/tv/${movieId}`;
  try {
    const res = await api(url);
    if (res.status !== 200) 
      throw new Error("Error fetching Serie data");
    const result = SerieDetailsSchema.safeParse(res.data);
    if (!result.success) 
      throw new Error("Error parsing Serie data");
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

async function getSerieRecommendation(movieId: string) {
  const url = `/3/tv/${movieId}/recommendations`;
  try {
    const res = await api(url);
    if (res.status !== 200)
      throw new Error("Error fetching Serie recommendations data");
    const result = SerieRecommendationsSchema.safeParse(res.data);
    if (!result.success)
      throw new Error("Error parsing Serie recommendation data");
    return result.data?.results;
  } catch (error) {
    console.log(error);
  }
}

export default async function Page({params}: {params: { serieId: string }}) {
  const { serieId } = params;
  const [itemResponse, recommendationResponse] = await Promise.allSettled([getSerie(serieId), getSerieRecommendation(serieId)]);

  if (itemResponse.status !== "fulfilled" || recommendationResponse.status !== "fulfilled") return <p>Cargando...</p>;

  const item = itemResponse.value;
  const recommendations = recommendationResponse.value;

  if (!item) return redirect("/")

  return (
    <MovieSerieDetails uknownItem={item} uknownRecommendations={recommendations}  />
  );
}
