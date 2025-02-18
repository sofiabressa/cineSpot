import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { 
  loginWithEmail, 
  loginWithGoogle, 
  registerWithEmail, 
  updatePassword, 
  deleteAccount 
} from "../services/authService";
import { auth } from "../firebase/firebaseConfig";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Função para login com e-mail e senha
  const login = async (email, password) => {
    try {
      const loggedUser = await loginWithEmail(email, password);
      setUser(loggedUser); // Define o usuário como logado
    } catch (error) {
      throw error;
    }
  };

  // Função para registro com e-mail e senha
  const register = async (email, password) => {
    try {
      await registerWithEmail(email, password); // Registra o usuário
      await signOut(auth); // Desconecta o usuário após o registro
      // Não chama setUser aqui, para evitar login automático
    } catch (error) {
      throw error;
    }
  };

  // Função para login com Google
  const googleLogin = async () => {
    try {
      const loggedUser = await loginWithGoogle();
      setUser(loggedUser); // Define o usuário como logado
    } catch (error) {
      throw error;
    }
  };

  // Função para logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Limpa o estado do usuário
    } catch (error) {
      throw error;
    }
  };

  // Função para alterar senha
  const changePassword = async (newPassword) => {
    try {
      await updatePassword(newPassword);
      setUser(null); // Limpa o estado do usuário após alterar a senha
    } catch (error) {
      throw error;
    }
  };

  // Função para excluir conta
  const removeAccount = async (password) => {
    try {
      await deleteAccount(password);
      setUser(null); // Limpa o estado do usuário após excluir a conta
    } catch (error) {
      throw error;
    }
  };

  // Valores disponíveis no contexto
  const contextValue = {
    user,
    loading,
    login,
    register,
    googleLogin,
    logout,
    changePassword,
    removeAccount,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};