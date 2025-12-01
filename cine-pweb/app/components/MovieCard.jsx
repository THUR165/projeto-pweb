'use client' // Componente de interação visual

import Link from 'next/link'; // Importante para Routing

export default function MovieCard({ movie }) {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    // O Link cria a navegação SPA (Single Page Application)
    <Link href={`/movie/${movie.id}`} className="group">
      <div className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
        <div className="relative h-[400px]">
          {movie.poster_path ? (
            <img 
              src={imageUrl} 
              alt={movie.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center text-white">Sem Imagem</div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-white font-bold truncate">{movie.title}</h3>
          <p className="text-gray-400 text-sm">{movie.release_date?.split('-')[0]}</p>
        </div>
      </div>
    </Link>
  );
}