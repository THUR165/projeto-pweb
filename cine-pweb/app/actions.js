'use server' // <--- ISSO É MÁGICA. Diz que esse código roda no servidor.

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = process.env.TMDB_BASE_URL;

export async function getPopularMovies() {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`);
  if (!res.ok) throw new Error('Falha ao buscar filmes');
  return res.json();
}

export async function getMovieDetails(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`);
  if (!res.ok) throw new Error('Falha ao buscar detalhes');
  return res.json();
}

export async function searchMovies(formData) {
  const query = formData.get('query');
  if (!query) return { results: [] };
  
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=pt-BR`);
  const data = await res.json();
  return data.results;
}

export async function getMoviesByQuery(query) {
  if (!query) return [];
  const urlSafeQuery = encodeURIComponent(query);
  
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${urlSafeQuery}&language=pt-BR`);
  
  if (!res.ok) throw new Error('Falha na busca');
  
  return res.json();
}