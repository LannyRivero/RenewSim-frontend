import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserDashboardLayout from "./UserDashboardLayout";
import toast from "react-hot-toast";

const UserSettings = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [showModal, setShowModal] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleDarkModeToggle = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    toast.success(`Modo ${newMode ? "oscuro" : "claro"} activado`);
  };

  const handleResetSimulations = async () => {
    setLoadingReset(true);
  
    try {
      // Backup local antes de borrar (opcional, por si quieres restaurar después)
      const simulations = localStorage.getItem("userSimulations");
      if (simulations) {
        localStorage.setItem("backupUserSimulations", simulations);
      }
  
      // ✅ Petición al backend para borrar las simulaciones del usuario
      await SimulationService.deleteUserSimulations(token);
  
      // Limpieza local adicional por coherencia
      localStorage.removeItem("userSimulations");
  
      toast.success("Historial de simulaciones eliminado ✅");
  
      setTimeout(() => {
        setLoadingReset(false);
        setShowModal(false);
  
        // Redirigimos automáticamente al historial limpio
        navigate("/dashboard/user/history");
      }, 1000);
    } catch (error) {
      console.error("❌ Error al eliminar historial:", error);
      toast.error("Error al eliminar el historial.");
      setLoadingReset(false);
    }
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
            onClick={() => setShowModal(true)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg transition hover:bg-red-700"
          >
            Resetear
          </button>
        </div>
      </div>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-4 shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              ¿Estás seguro?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Esta acción eliminará todo el historial de simulaciones. Se guardará una copia de seguridad por si la necesitas.
            </p>

            {loadingReset ? (
              <p className="text-blue-600 dark:text-blue-400 font-medium">Eliminando historial...</p>
            ) : (
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleResetSimulations}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Confirmar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </UserDashboardLayout>
  );
};

export default UserSettings;
