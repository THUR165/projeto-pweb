'use client'

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react'; 

export default function WishlistButton({ movie }) {
  const [isSaved, setIsSaved] = useState(false);
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('cinepweb_favorites')) || [];
    const exists = favorites.some(fav => fav.id === movie.id);
    setIsSaved(exists);
  }, [movie.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('cinepweb_favorites')) || [];
    
    if (isSaved) {
      const newFavorites = favorites.filter(fav => fav.id !== movie.id);
      localStorage.setItem('cinepweb_favorites', JSON.stringify(newFavorites));
      setIsSaved(false);
    } else {
      favorites.push(movie);
      localStorage.setItem('cinepweb_favorites', JSON.stringify(favorites));
      setIsSaved(true);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all border ${
        isSaved 
          ? 'bg-red-600 text-white hover:bg-red-700 border-red-500' 
          : 'bg-gray-800 text-white hover:bg-gray-700 border-gray-600'
      }`}
    >
      <Heart 
        size={20} 
        fill={isSaved ? "currentColor" : "none"} 
        className={isSaved ? "text-white" : "text-gray-400"}
      />
      {isSaved ? "Remover da Lista" : "Adicionar à Lista"}
    </button>
  );
}