import { getMovieDetails } from '../../actions'; 
import Link from 'next/link';
import WishlistButton from '../../components/WishlistButton';

export async function generateMetadata({ params }) {
  const { id } = await params; 
  const movie = await getMovieDetails(id);
  return { title: movie.title };
}

export default async function MovieDetails({ params }) {
  const { id } = await params;
  const movie = await getMovieDetails(id);
  
  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20">
      
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

      <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        
        <div className="md:w-1/3 flex justify-center md:justify-start">
           <img 
             src={posterUrl} 
             alt={movie.title} 
             className="rounded-xl shadow-2xl max-w-[300px] border-4 border-gray-800" 
           />
        </div>

        <div className="md:w-2/3">
          <h2 className="text-2xl font-bold mb-4 text-blue-400 border-b border-gray-800 pb-2">Sinopse</h2>
          <p className="text-lg leading-relaxed text-gray-300 mb-6">
            {movie.overview || "Este filme não possui sinopse oficial traduzida."}
          </p>
          
          <div className="my-8 p-6 bg-gray-800/40 rounded-xl border border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
             <div>
                <p className="text-white font-bold text-lg">Gostou do filme?</p>
                <p className="text-gray-400 text-sm">Salve para assistir depois.</p>
             </div>
             <WishlistButton movie={movie} />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <span className="block text-gray-500 text-xs uppercase font-bold mb-1">Data de Lançamento</span>
              <span className="text-lg font-medium">{movie.release_date?.split('-').reverse().join('/')}</span>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <span className="block text-gray-500 text-xs uppercase font-bold mb-1">Avaliação dos Usuários</span>
              <span className="text-lg font-medium text-yellow-400 flex items-center gap-1">
                ★ {movie.vote_average?.toFixed(1)} <span className="text-gray-500 text-sm">/ 10</span>
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {movie.genres?.map(genre => (
              <span key={genre.id} className="bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-500/20">
                {genre.name}
              </span>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}