'use client'

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import MovieCard from './MovieCard';
import { getPopularMovies, getMoviesByQuery } from '../actions';

export default function LoadMore({ searchParams }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(2); 
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px', 
  });

  const loadMoreMovies = async () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    console.log(`⚡ Carregando página ${page}...`); 

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      let res;
      if (searchParams) {
         res = await getMoviesByQuery(searchParams, page);
      } else {
         res = await getPopularMovies(page);
      }

      const newMovies = res.results || [];

      if (newMovies.length > 0) {
        setMovies((prevMovies) => {
           const uniqueNewMovies = newMovies.filter(
             (newMovie) => !prevMovies.some((existing) => existing.id === newMovie.id)
           );
           return [...prevMovies, ...uniqueNewMovies];
        });
        
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("❌ Erro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (inView) {
      loadMoreMovies();
    }
  }, [inView]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
        {movies.map((movie, index) => (
          <MovieCard key={`${movie.id}-${index}`} movie={movie} />
        ))}
      </div>

      {hasMore && (
        <div 
          ref={ref} 
          className="flex flex-col justify-center items-center py-10 col-span-full gap-4"
        >
          {isLoading ? (
             <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          ) : (
             <button 
               onClick={loadMoreMovies}
               className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-full font-bold transition-colors border border-gray-600"
             >
               Carregar Mais
             </button>
          )}
        </div>
      )}
    </>
  );
}