import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { app, db } from "../firebase/firebaseConfig";

const auth = getAuth(app);

// Criar usuário e salvar no Firestore
export const registerWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Criar documento no Firestore para o usuário
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      createdAt: new Date(),
    });

    return user;
  } catch (error) {
    console.error("Erro ao criar conta:", error.message);
    throw error;
  }
};

// Login e buscar dados do Firestore
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Buscar informações do usuário no Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      return { ...user, ...userDoc.data() };
    }

    return user;
  } catch (error) {
    console.error("Erro ao fazer login:", error.message);
    throw error;
  }
};

// Login com Google e salvar usuário no Firestore se for novo
export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider(); // Cria o provedor do Google
    const userCredential = await signInWithPopup(auth, provider); // Abre o popup de login
    const user = userCredential.user;

    // Verifica se o usuário já existe no Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date(),
      });
    }

    return user;
  } catch (error) {
    console.error("Erro ao fazer login com Google:", error.message);
    throw error;
  }
};

// Logout
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Erro ao fazer logout:", error.message);
    throw error;
  }
};