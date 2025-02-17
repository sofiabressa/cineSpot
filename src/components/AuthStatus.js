import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { FcGoogle } from "react-icons/fc"; 
import { FiLogOut } from "react-icons/fi"; 

const AuthStatus = () => {
  const { user, logout, googleLogin } = useContext(UserContext); // Pegando googleLogin do contexto

  if (user) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span>Olá, {user.email}</span>
        <button onClick={logout} style={{ background: "none", border: "none", cursor: "pointer" }}>
          <FiLogOut size={20} />
        </button>
      </div>
    );
  }

  return (
    <button onClick={googleLogin} style={{ background: "none", border: "none", cursor: "pointer" }}>
      <FcGoogle size={20} />
    </button>
  );
};

export default AuthStatus;
