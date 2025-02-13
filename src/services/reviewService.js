import { db } from "../firebase/firebaseConfig.js";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

// Adicionar uma avaliação
export const addReview = async (userId, movieId, rating, comment) => {
  try {
    const reviewRef = collection(db, "reviews");
    const newReview = {
      userId,
      movieId,
      rating,
      comment,
      createdAt: new Date()
    };

    const docRef = await addDoc(reviewRef, newReview);
    return docRef.id;
  } catch (error) {
    console.error("Erro ao adicionar avaliação:", error.message);
    throw error;
  }
};

// Buscar todas as avaliações de um filme específico
export const getReviewsByMovie = async (movieId) => {
  try {
    const reviewsRef = collection(db, "reviews");
    const q = query(reviewsRef, where("movieId", "==", movieId));
    const querySnapshot = await getDocs(q);

    let reviews = [];
    querySnapshot.forEach((doc) => {
      reviews.push({ id: doc.id, ...doc.data() });
    });

    return reviews;
  } catch (error) {
    console.error("Erro ao buscar avaliações:", error.message);
    throw error;
  }
};
