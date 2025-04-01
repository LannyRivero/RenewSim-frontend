import React from "react";
import { useAuth } from "../../context/AuthContext";

const DashboardFooter = () => {
  const { user } = useAuth();

  const getRoleMessage = () => {
    if (!user || !user.roles) return null;

    if (user.roles.includes("ADMIN")) {
      return "Accediendo como Administrador del sistema";
    }
    if (user.roles.includes("ADVANCED_USER")) {
      return "Usuario avanzado – acceso extendido";
    }
    return "Usuario estándar – simulaciones disponibles";
  };

  return (
    <footer className="bg-white border-t mt-6 py-4 text-center text-sm text-gray-500 shadow-inner">
      <p>© {new Date().getFullYear()} RenewSim. Powered by Energía Sostenible ⚡</p>
      {user && <p className="text-xs text-gray-400 mt-1">{getRoleMessage()}</p>}
    </footer>
  );
};

export default DashboardFooter;
