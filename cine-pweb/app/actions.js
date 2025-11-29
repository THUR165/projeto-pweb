'use server' // <--- ISSO É MÁGICA. Diz que esse código roda no servidor.

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = process.env.TMDB_BASE_URL;

// Buscar filmes populares
export async function getPopularMovies() {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`);
  if (!res.ok) throw new Error('Falha ao buscar filmes');
  return res.json();
}

// Buscar detalhes de um filme específico
export async function getMovieDetails(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`);
  if (!res.ok) throw new Error('Falha ao buscar detalhes');
  return res.json();
}

// Buscar filmes por nome (Para o Search)
export async function searchMovies(formData) {
  const query = formData.get('query'); // Pega o dado do input name="query"
  if (!query) return { results: [] };
  
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=pt-BR`);
  const data = await res.json();
  return data.results;
}