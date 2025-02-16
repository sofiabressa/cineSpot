import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup, 
  updatePassword as firebaseUpdatePassword, 
  deleteUser, 
  reauthenticateWithCredential, 
  EmailAuthProvider 
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { app, db } from "../firebase/firebaseConfig";

const auth = getAuth(app);

// Função para reautenticar o usuário
export const reauthenticateUser = async (password) => {
  const user = auth.currentUser;

  if (!user || !user.email) {
    throw new Error("Nenhum usuário logado ou e-mail não disponível.");
  }

  const credential = EmailAuthProvider.credential(user.email, password);
  await reauthenticateWithCredential(user, credential);
};

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
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
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

// Alterar senha (atualiza diretamente no Firebase Authentication)
export const updatePassword = async (newPassword) => {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("Nenhum usuário logado.");
    }

    // Atualiza a senha
    await firebaseUpdatePassword(user, newPassword);

    // Faz logout após alterar a senha
    await signOut(auth);
  } catch (error) {
    console.error("Erro ao atualizar senha:", error.message);
    throw error;
  }
};

// Excluir conta com reautenticação
export const deleteAccount = async (password) => {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("Nenhum usuário logado.");
    }

    // Reautenticação para provedores de e-mail/senha
    if (user.providerData[0].providerId === 'password') {
      await reauthenticateUser(password);
    }

    // Excluir documento do Firestore
    await deleteDoc(doc(db, "users", user.uid));

    // Excluir usuário do Firebase Authentication
    await deleteUser(user);

    // Faz logout após exclusão
    await signOut(auth);

    return true;
  } catch (error) {
    console.error("Erro ao excluir conta:", error);
    throw error;
  }
};