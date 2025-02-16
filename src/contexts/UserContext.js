import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { loginWithEmail, loginWithGoogle, registerWithEmail } from "../services/authService"; // Importe os métodos do authService
import { auth } from "../firebase/firebaseConfig"; // Importe a configuração do Firebase

// Cria o contexto
export const UserContext = createContext();

// Provedor do contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para armazenar o usuário logado
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento inicial

  // Verifica o estado de autenticação ao carregar o componente
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser); // Atualiza o estado do usuário
      } else {
        setUser(null); // Limpa o estado do usuário
      }
      setLoading(false); // Finaliza o carregamento
    });

    return () => unsubscribe(); // Limpa o listener ao desmontar o componente
  }, []);

  // Função para login com e-mail e senha
  const login = async (email, password) => {
    try {
      const loggedUser = await loginWithEmail(email, password);
      setUser(loggedUser);
    } catch (error) {
      throw error;
    }
  };

  // Função para registro com e-mail e senha
  const register = async (email, password) => {
    try {
      const newUser = await registerWithEmail(email, password);
      setUser(newUser);
    } catch (error) {
      throw error;
    }
  };

  // Função para login com Google
  const googleLogin = async () => {
    try {
      const loggedUser = await loginWithGoogle();
      setUser(loggedUser);
    } catch (error) {
      throw error;
    }
  };

  // Função para logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
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
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};