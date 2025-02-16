import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { app, db } from "../firebase/firebaseConfig";
import { GoogleSignin } from '@react-native-google-signin/google-signin'; // Importe a biblioteca de autenticação do Google

const auth = getAuth(app);

// Configuração do Google Sign-In
GoogleSignin.configure({
  webClientId: '203238658170-n9oi918ljt99064cgvp7g2feqj9a7h92.apps.googleusercontent.com', // Substitua pelo seu Web Client ID do Firebase
});

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
    // Verifica se o Google Sign-In está configurado corretamente
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Realiza o login com o Google
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Autentica no Firebase com as credenciais do Google
    const userCredential = await auth.signInWithCredential(googleCredential);
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