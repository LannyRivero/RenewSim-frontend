import React, { useState, useEffect } from "react";
import UserDashboardLayout from "./UserDashboardLayout";
import toast from "react-hot-toast";

const UserSettings = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleDarkModeToggle = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    toast.success(`Modo ${newMode ? "oscuro" : "claro"} activado`);
  };

  const handleResetSimulations = () => {
    localStorage.removeItem("userSimulations");
    toast.success("Historial de simulaciones eliminado ✅");
  };

  return (
    <UserDashboardLayout>
      <h2 className="text-2xl font-semibold mb-6">⚙️ Configuración avanzada</h2>

      <div className="space-y-6">

        {/* Configuración de modo oscuro */}
        <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <span>Modo oscuro predeterminado</span>
          <button
            onClick={handleDarkModeToggle}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg transition hover:bg-blue-700"
          >
            {darkMode ? "Desactivar" : "Activar"}
          </button>
        </div>

        {/* Reset de simulaciones */}
        <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <span>Resetear historial de simulaciones</span>
          <button
            onClick={handleResetSimulations}
            className="bg-red-600 text-white px-4 py-2 rounded-lg transition hover:bg-red-700"
          >
            Resetear
          </button>
        </div>

      </div>
    </UserDashboardLayout>
  );
};

export default UserSettings;

