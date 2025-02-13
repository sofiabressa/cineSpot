import axios from 'axios';

// Sua chave da API do TMDb
const API_KEY = 'e48a5e480776d901780d6e233fc3926f';
const BASE_URL = 'https://api.themoviedb.org/3';

// Instância do axios com a URL base
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'pt-BR', // Definindo o idioma como português (pode ser alterado conforme necessário)
  },
});

export default api;
