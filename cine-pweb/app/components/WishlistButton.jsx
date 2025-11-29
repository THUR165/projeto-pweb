'use client'

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react'; 

export default function WishlistButton({ movie }) {
  const [isSaved, setIsSaved] = useState(false);

  // 1. Ao carregar, verifica se já está salvo no navegador
  useEffect(() => {
    // Pega a lista do localStorage (ou cria uma vazia se não existir)
    const favorites = JSON.parse(localStorage.getItem('cinepweb_favorites')) || [];
    // Verifica se este filme específico já está na lista
    const exists = favorites.some(fav => fav.id === movie.id);
    setIsSaved(exists);
  }, [movie.id]);

  // 2. Função de adicionar/remover
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('cinepweb_favorites')) || [];
    
    if (isSaved) {
      // Remover: Filtra todos que NÃO são esse filme
      const newFavorites = favorites.filter(fav => fav.id !== movie.id);
      localStorage.setItem('cinepweb_favorites', JSON.stringify(newFavorites));
      setIsSaved(false);
    } else {
      // Adicionar: Coloca o filme na lista
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