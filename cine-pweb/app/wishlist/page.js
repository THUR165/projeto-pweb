'use client'

import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';

export default function WishlistPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Carrega os filmes salvos do LocalStorage
    const stored = JSON.parse(localStorage.getItem('cinepweb_favorites')) || [];
    setFavorites(stored);
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8 border-l-4 border-red-500 pl-4">
        Minha Lista de Desejos
      </h1>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500 mb-4">Sua lista está vazia 😢</p>
          <a href="/" className="text-blue-400 hover:underline">
            Voltar para a Home e adicionar filmes
          </a>
        </div>
      )}
    </main>
  );
}