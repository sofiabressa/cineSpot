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
    const response = await api.get(`/movie/${movieId}/release_dates`);
    return response.data.results; // Retorna os dados de certificação
  } catch (error) {
    console.error('Erro ao obter certificações:', error);
    throw error;
  }
};

// Buscar elenco de um filme
export const getMovieCast = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/credits`);
    return response.data.cast; 
  } catch (error) {
    console.error('Erro ao obter elenco:', error);
    throw error;
  }
};