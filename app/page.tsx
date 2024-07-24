import Hero from "./components/Hero";
import MoviesTrending from "./components/MoviesTrending";
import MoviesOnTrend from "./components/MoviesTrending";


export default async function Home() {
  return (
    <>
      <Hero />
      <MoviesTrending />
    </>
  );
}
