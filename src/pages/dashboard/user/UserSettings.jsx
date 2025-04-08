import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SimulationService from "@/services/SimulationService";
import Button from "@/components/common/button/Button";

const UserSettings = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
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
      const simulations = localStorage.getItem("userSimulations");
      if (simulations) {
        localStorage.setItem("backupUserSimulations", simulations);
      }

      await SimulationService.deleteUserSimulations();
      localStorage.removeItem("userSimulations");

      toast.success("Historial de simulaciones eliminado ✅");

      setTimeout(() => {
        setLoadingReset(false);
        setShowModal(false);
        navigate("/dashboard/user/history");
      }, 1000);
    } catch (error) {
      console.error("❌ Error al eliminar historial:", error);
      toast.error("Error al eliminar el historial.");
      setLoadingReset(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-8 transition-colors duration-500">
      <div
        className="w-full max-w-2xl p-8 rounded-3xl shadow-2xl border border-white/30 dark:border-white/20 bg-white/30 dark:bg-white/10 backdrop-blur-xl transition-all duration-500"
        style={{
          background: "rgba(255, 255, 255, 0.25)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.18)",
        }}
      >
        <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800 dark:text-white animate-fade-in-down">
          ⚙️ Configuración avanzada
        </h2>

        <div className="space-y-6">
          {/* Configuración de modo oscuro */}
          <div className="flex items-center justify-between bg-white/50 dark:bg-gray-800/50 backdrop-blur-md shadow-lg border border-gray-300 dark:border-gray-700 p-4 rounded-xl animate-fade-in-down">
            <span className="text-gray-700 dark:text-gray-300">Modo oscuro predeterminado</span>
            <Button
              variant="secondary"
              onClick={handleDarkModeToggle}
            >
              {darkMode ? "Desactivar" : "Activar"}
            </Button>
          </div>

          {/* Reset de simulaciones */}
          <div className="flex items-center justify-between bg-white/50 dark:bg-gray-800/50 backdrop-blur-md shadow-lg border border-gray-300 dark:border-gray-700 p-4 rounded-xl animate-fade-in-down">
            <span className="text-gray-700 dark:text-gray-300">Resetear historial de simulaciones</span>
            <Button
              variant="danger"
              onClick={() => setShowModal(true)}
            >
              Resetear
            </Button>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 space-y-4 shadow-xl border border-gray-300 dark:border-gray-700 max-w-sm w-full animate-fade-in-down">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              ¿Estás seguro?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Esta acción eliminará todo el historial de simulaciones. Se guardará una copia de seguridad por si la necesitas.
            </p>

            {loadingReset ? (
              <p className="text-blue-600 dark:text-blue-400 font-medium">
                Eliminando historial...
              </p>
            ) : (
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Cancelar
                </Button>
                <Button variant="danger" onClick={handleResetSimulations}>
                  Confirmar
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSettings;



