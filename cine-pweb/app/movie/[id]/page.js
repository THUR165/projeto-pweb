import { getMovieDetails } from '../../actions'; // Ajuste o caminho conforme necessário
import Link from 'next/link';

// Esta função gera os metadados da página (Título na aba do navegador)
export async function generateMetadata({ params }) {
  const movie = await getMovieDetails(params.id);
  return { title: movie.title };
}

export default async function MovieDetails({ params }) {
  // O Next.js passa o ID da URL via props 'params'
  const movie = await getMovieDetails(params.id);
  
  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section com Imagem de Fundo */}
      <div 
        className="h-[50vh] w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute bottom-10 left-10 container mx-auto px-4">
          <Link href="/" className="bg-white/20 px-4 py-2 rounded mb-4 inline-block hover:bg-white/30 transition">
            &larr; Voltar
          </Link>
          <h1 className="text-5xl font-bold mb-2">{movie.title}</h1>
          <p className="text-xl text-gray-300 italic">{movie.tagline}</p>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">Sinopse</h2>
          <p className="text-lg leading-relaxed text-gray-300">{movie.overview}</p>
          
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-gray-800 p-4 rounded">
              <span className="block text-gray-500 text-sm">Data de Lançamento</span>
              <span className="text-lg font-medium">{movie.release_date}</span>
            </div>
            <div className="bg-gray-800 p-4 rounded">
              <span className="block text-gray-500 text-sm">Nota (Média)</span>
              <span className="text-lg font-medium text-yellow-400">★ {movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}