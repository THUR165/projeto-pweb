'use client' // Importante: Roda no navegador

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Search() {
  const [text, setText] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    
    if (text.trim()) {
      // Redireciona para a Home com o parâmetro ?query=O_QUE_DIGITOU
      router.push(`/?query=${text}`);
    } else {
      // Se limpar, volta para a home pura
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="text"
        placeholder="Busque um filme..."
        className="bg-gray-800 text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700 w-full md:w-64"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button 
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
      >
        🔍
      </button>
    </form>
  );
}