import { getMovieDetails } from '../../actions'; // Ajuste o caminho dos ../ se necessário
import Link from 'next/link';

// 1. Correção no Metadata (Título da aba)
export async function generateMetadata({ params }) {
  const { id } = await params; // <--- AWAIT OBRIGATÓRIO NO NEXT.JS 16
  const movie = await getMovieDetails(id);
  return { title: movie.title };
}

// 2. Correção no Componente Principal
export default async function MovieDetails({ params }) {
  // <--- AWAIT OBRIGATÓRIO AQUI TAMBÉM
  const { id } = await params; 
  
  // Agora passamos o ID correto (numérico) em vez de undefined
  const movie = await getMovieDetails(id);
  
  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div 
        className="h-[50vh] w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute bottom-10 left-10 container mx-auto px-4">
          <Link href="/" className="bg-white/20 px-4 py-2 rounded mb-4 inline-block hover:bg-white/30 transition text-sm font-semibold">
            &larr; Voltar
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{movie.title}</h1>
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
              <span className="text-lg font-medium text-yellow-400">★ {movie.vote_average?.toFixed(1)}</span>
            </div>
          </div>
        </div>
        
        {/* Poster Lateral (Opcional) */}
        <div className="md:w-1/3">
           <img 
             src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
             alt={movie.title}
             className="rounded-xl shadow-2xl"
           />
        </div>
      </div>
    </div>
  );
}