import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SimulationService from "@/services/SimulationService";
import Button from "@/components/common/button/Button";
import ConfirmModal from "@/components/modals/ConfirmModal";

const UserSettings = () => {
  const [showModal, setShowModal] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);
  const navigate = useNavigate();

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
    <div className="min-h-screen flex justify-center items-start bg-gradient-to-br from-green-50 via-white to-green-100 px-4 py-16 transition-colors duration-500">
      <div
        className="w-full max-w-3xl p-8 rounded-3xl shadow-2xl border border-white/30 bg-white/30 backdrop-blur-xl transition-all duration-500"
        style={{
          background: "rgba(255, 255, 255, 0.25)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.18)",
        }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 animate-fade-in-down flex items-center justify-center gap-2">
          <span role="img" aria-label="config">⚙️</span> Configuración Avanzada
        </h2>

        <div className="space-y-6">
          {/* Reset simulations */}
          <div className="flex items-center justify-between bg-white/50 backdrop-blur-md shadow-lg border border-gray-300 p-4 rounded-xl animate-fade-in-down">
            <span className="text-gray-700">Resetear historial de simulaciones</span>
            <Button variant="danger" onClick={() => setShowModal(true)}>
              Resetear
            </Button>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleResetSimulations}
        title="¿Estás seguro?"
        description="Esta acción eliminará todo el historial de simulaciones. Se guardará una copia de seguridad por si la necesitas."
        confirmText="Confirmar"
        cancelText="Cancelar"
        loading={loadingReset}
      />
    </div>
  );
};

export default UserSettings;



