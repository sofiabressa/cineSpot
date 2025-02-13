import api from '../api/api';

// Buscar filmes populares
export const getPopularMovies = async () => {
  try {
    const response = await api.get('/movie/popular');
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar filmes populares:', error);
    return [];
  }
};

// Buscar detalhes de um filme
export const getMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar detalhes do filme:', error);
    return null;
  }
};

// Buscar plataformas de streaming de um filme (usando TMDB)
export const getMovieStreaming = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/watch/providers`);
    return response.data.results?.BR?.flatrate || []; // "BR" para Brasil, ou altere para outro país
  } catch (error) {
    console.error('Erro ao buscar plataformas de streaming:', error);
    return [];
  }
};

// Buscar certificações de um filme (classificação indicativa)
export const getMovieCertifications = async (movieId) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/release_dates?api_key=YOUR_API_KEY`);
    const data = await response.json();
    return data.results; // Retorna os dados de certificação
  } catch (error) {
    console.error('Erro ao obter certificações:', error);
    throw error;
  }
};

// Buscar elenco de um filme
export const getMovieCast = async (movieId) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=e48a5e480776d901780d6e233fc3926f`);
    const data = await response.json();
    return data.cast; 
  } catch (error) {
    console.error('Erro ao obter elenco:', error);
    throw error;
  }
};
