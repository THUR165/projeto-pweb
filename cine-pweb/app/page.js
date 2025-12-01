import { getPopularMovies, getMoviesByQuery } from './actions';
import MovieCard from './components/MovieCard';
import LoadMore from './components/LoadMore';

export default async function Home({ searchParams }) {
  
  const { query } = await searchParams;
  
  let movies = [];
  
  if (query) {
    const data = await getMoviesByQuery(query, 1);
    movies = data.results || [];
  } else {
    const data = await getPopularMovies(1);
    movies = data.results || [];
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8 border-l-4 border-blue-500 pl-4">
        {query ? `Resultados para: "${query}"` : 'Filmes Populares'}
      </h1>
      
      {movies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-lg">Nenhum filme encontrado 😕</p>
      )}

      <LoadMore searchParams={query} />
      
    </main>
  );
}