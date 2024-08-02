import { GenreType } from "@/types/gender-response"
import DetailsGenreTag from "../DetailsGenreTag"

interface DetailsGenresListProps {
  genres: GenreType[]
}

export default function DetailsGenresList(props: DetailsGenresListProps) {
  const {genres} = props
  return (
    <div className="my-3 flex flex-wrap gap-3">
      {
        genres.map(genre => (
          <DetailsGenreTag key={genre.id} genre={genre} />
        ))
      }
    </div>
  )
}
