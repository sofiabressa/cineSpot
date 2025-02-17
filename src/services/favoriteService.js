import { getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { auth } from '../firebase/firebaseConfig'; 
import { getMovieDetails } from './movieService';  // Importa getMovieDetails
import { getTVShowDetails } from './movieService';  // Importa getTVShowDetails

// Inicialize o Firestore
const db = getFirestore();

// Adicionar aos favoritos
export const addToFavorites = async (movieId, mediaType) => {
  const userId = auth.currentUser?.uid; // Verifica se o usuário está autenticado
  if (!userId) return; // Se não estiver autenticado, retorna

  try {
    // Adiciona aos favoritos usando a coleção correta
    await addDoc(collection(db, 'favorites'), {
      userId,
      movieId,
      media_type: mediaType,  // Adiciona o tipo de mídia (movie ou tv)
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Erro ao adicionar aos favoritos:', error);
    throw error; // Lança o erro para que ele possa ser tratado no componente que chama a função
  }
};

// Remover dos favoritos
export const removeFromFavorites = async (movieId, mediaType) => {
  const userId = auth.currentUser?.uid; // Verifica se o usuário está autenticado
  if (!userId) return; // Se não estiver autenticado, retorna

  try {
    // Cria uma consulta para encontrar o documento correspondente
    const q = query(
      collection(db, 'favorites'),
      where('userId', '==', userId),
      where('movieId', '==', movieId),
      where('media_type', '==', mediaType)  // Verifica o tipo de mídia
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (docSnapshot) => {
      // Remove o documento encontrado
      await deleteDoc(doc(db, 'favorites', docSnapshot.id));
    });
  } catch (error) {
    console.error('Erro ao remover dos favoritos:', error);
    throw error; // Lança o erro para que ele possa ser tratado no componente que chama a função
  }
};

// Verificar se está nos favoritos
export const checkIfFavorite = async (movieId, mediaType) => {
  const userId = auth.currentUser?.uid; // Verifica se o usuário está autenticado
  if (!userId) return false; // Se não estiver autenticado, retorna false

  try {
    // Cria uma consulta para verificar se o filme ou série está nos favoritos
    const q = query(
      collection(db, 'favorites'),
      where('userId', '==', userId),
      where('movieId', '==', movieId),
      where('media_type', '==', mediaType)  // Verifica o tipo de mídia
    );

    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Retorna se o item está ou não nos favoritos
  } catch (error) {
    console.error('Erro ao verificar favoritos:', error);
    throw error; // Lança o erro para que ele possa ser tratado no componente que chama a função
  }
};

// Obter todos os favoritos do usuário
export const getUserFavorites = async () => {
  const userId = auth.currentUser?.uid;
  if (!userId) return [];

  try {
    const q = query(collection(db, 'favorites'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    // Mapeia os documentos para obter os dados básicos
    const favoriteItems = querySnapshot.docs.map(doc => ({
      id: doc.id, // ID do documento no Firestore
      ...doc.data(), // Dados do documento (userId, movieId, media_type, createdAt)
    }));

    // Busca detalhes de cada filme ou série favoritado
    const moviesAndShows = await Promise.all(
      favoriteItems.map(async (item) => {
        try {
          if (item.media_type === 'movie') {
            const movieDetails = await getMovieDetails(item.movieId);
            return { ...movieDetails, media_type: 'movie' }; // Adiciona o tipo de mídia
          } else if (item.media_type === 'tv') {
            const tvShowDetails = await getTVShowDetails(item.movieId);
            return { ...tvShowDetails, media_type: 'tv' }; // Adiciona o tipo de mídia
          }
        } catch (error) {
          console.error(`Erro ao buscar detalhes do item ${item.movieId}:`, error);
          return null; // Retorna null em caso de erro
        }
      })
    );

    // Filtra resultados nulos (caso algum item tenha falhado)
    return moviesAndShows.filter(item => item !== null);
  } catch (error) {
    console.error('Erro ao buscar filmes e séries favoritos:', error);
    throw error; // Lança o erro para que ele possa ser tratado no componente que chama a função
  }
};