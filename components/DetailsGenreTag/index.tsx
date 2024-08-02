import { GenreType } from "@/types/gender-response";

interface MovieGenreTagProps {
  genre: GenreType;
}

export default function DetailsGenreTag(props: MovieGenreTagProps) {
  const { genre } = props;
  return (
    <h4 className="px-5 py-2 bg-slate-200/30 rounded-full text-tiny backdrop-blur-sm">
      {genre.name}
    </h4>
  );
}
