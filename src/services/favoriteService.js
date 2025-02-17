import { getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { auth } from '../firebase/firebaseConfig'; // Está correto

// Inicialize o Firestore
const db = getFirestore(); // Garantir que você está usando o Firestore corretamente

export const addToFavorites = async (movieId) => {
  const userId = auth.currentUser?.uid; // Verifica se o usuário está autenticado
  if (!userId) return; // Se não estiver autenticado, retorna

  try {
    // Adiciona aos favoritos usando a coleção correta
    await addDoc(collection(db, 'favorites'), {
      userId,
      movieId,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Erro ao adicionar aos favoritos:', error);
  }
};

export const removeFromFavorites = async (movieId) => {
  const userId = auth.currentUser?.uid; // Verifica se o usuário está autenticado
  if (!userId) return; // Se não estiver autenticado, retorna

  try {
    // Cria uma consulta para encontrar o documento correspondente
    const q = query(
      collection(db, 'favorites'),
      where('userId', '==', userId),
      where('movieId', '==', movieId)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (docSnapshot) => {
      // Remove o documento encontrado
      await deleteDoc(doc(db, 'favorites', docSnapshot.id));
    });
  } catch (error) {
    console.error('Erro ao remover dos favoritos:', error);
  }
};

export const checkIfFavorite = async (movieId) => {
  const userId = auth.currentUser?.uid; // Verifica se o usuário está autenticado
  if (!userId) return false; // Se não estiver autenticado, retorna false

  try {
    // Cria uma consulta para verificar se o filme está nos favoritos
    const q = query(
      collection(db, 'favorites'),
      where('userId', '==', userId),
      where('movieId', '==', movieId)
    );

    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Retorna se o filme está ou não nos favoritos
  } catch (error) {
    console.error('Erro ao verificar favoritos:', error);
    return false;
  }
};
