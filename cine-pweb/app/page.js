import { getPopularMovies, getMoviesByQuery } from './actions'; // Importe a nova função
import MovieCard from './components/MovieCard';

// Adicione props { searchParams } na função principal
export default async function Home({ searchParams }) {
  
  // No Next.js 16, searchParams é uma Promessa (igual ao params)
  // Precisamos esperar ela resolver para ver se tem busca
  const { query } = await searchParams;
  
  let movies = [];
  
  if (query) {
    // Se tiver busca na URL, usa a função de busca
    const data = await getMoviesByQuery(query);
    movies = data.results || [];
  } else {
    // Se não, carrega os populares
    const data = await getPopularMovies();
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
    </main>
  );
}