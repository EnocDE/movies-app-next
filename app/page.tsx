import Hero from "./components/Hero";
import MoviesAndSeries from "./components/MoviesAndSeries";
import MoviesTrending from "./components/MoviesTrending";


export default async function Home() {
  return (
    <>
      <Hero />
      <MoviesTrending />
      <MoviesAndSeries />
    </>
  );
}
