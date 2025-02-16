import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { FcGoogle } from "react-icons/fc"; // Ícone do Google
import { FiLogOut } from "react-icons/fi"; // Ícone de logout

const AuthStatus = () => {
  const { user, logout } = useContext(UserContext);

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
    <button onClick={loginWithGoogle} style={{ background: "none", border: "none", cursor: "pointer" }}>
      <FcGoogle size={20} />
    </button>
  );
};

export default AuthStatus;