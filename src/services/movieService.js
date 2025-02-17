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

// Buscar filmes por nome
export const searchMovies = async (query) => {
  try {
    const response = await api.get('/search/movie', {
      params: {
        query: query, // Termo de pesquisa
      },
    });
    return response.data.results; // Retorna a lista de filmes encontrados
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    return [];
  }
};

// Buscar filmes por gênero
export const getMoviesByGenre = async (genreId) => {
  try {
    const response = await api.get('/discover/movie', {
      params: {
        with_genres: genreId, // Filtra pelo ID do gênero
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar filmes por gênero:', error);
    return [];
  }
};

// Buscar filmes em cartaz
export const getNowPlayingMovies = async () => {
  try {
    const response = await api.get('/movie/now_playing');
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar filmes em cartaz:', error);
    return [];
  }
};

// Buscar séries populares
export const getPopularTVShows = async () => {
  try {
    const response = await api.get('/tv/popular');
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar séries populares:', error);
    return [];
  }
};

// Buscar séries por gênero
export const getTVShowsByGenre = async (genreId) => {
  try {
    const response = await api.get('/discover/tv', {
      params: {
        with_genres: genreId, // Filtra séries pelo ID do gênero
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar séries por gênero:', error);
    return [];
  }
};
