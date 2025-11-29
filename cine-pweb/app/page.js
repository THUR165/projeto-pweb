import { getPopularMovies } from './actions';
import MovieCard from './components/MovieCard';

export default async function Home() {
  // Chamada direta da função (sem useEffect!) - Roda no Servidor
  const data = await getPopularMovies();
  const movies = data.results;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8 border-l-4 border-blue-500 pl-4">
        Filmes Populares
      </h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
}