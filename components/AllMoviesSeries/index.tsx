import { MoviesResultsSchema, MovieType } from "@/types/movies-response"
import { SerieType } from "@/types/series-response"
import ItemCard from "../ItemCard"
import ListPagination from "../ListPagination"

interface AllMoviesSeriesProps {
  uknownItems: unknown
}

export default function AllMoviesSeries(props: AllMoviesSeriesProps) {
  const {uknownItems} = props

  let items : MovieType[] | SerieType[]
  const result = MoviesResultsSchema.safeParse(uknownItems)
  if (result.success) {
    items = uknownItems as MovieType[]
  } else {
    items = uknownItems as SerieType[]
  }

  return (
    <main>
      <ul className="grid grid-cols-auto-fit gap-5 justify-center justify-items-center">
        {items &&
          items.map((item) => (
            <ItemCard
              item={item}
              key={item.id}
              imageClass="w-full h-full object-cover"
              liClass="sm:w-full aspect-[4/6]"
            />
          ))}
      </ul>
      <ListPagination  />
    </main>
  );
}
