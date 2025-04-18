import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaChartBar } from "react-icons/fa";
import ConfirmModal from "@/components/modals/ConfirmModal";
import SimulationService from "@/services/SimulationService";
import Tooltip from "@/components/common/Tooltip";
import { toast } from 'react-toastify';




const formatNumber = (value) =>
  new Intl.NumberFormat("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const SimulationHistory = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [simulations, setSimulations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedSimulationId, setSelectedSimulationId] = useState(null);

  useEffect(() => {
    fetchSimulations();
  }, [token]);

  const fetchSimulations = async () => {
    try {
      const data = await SimulationService.getUserSimulations();
      const sorted = data.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
      setSimulations(sorted);
    } catch (error) {
      console.error("❌ Error al obtener el historial:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (simulationId) => {
    try {
      await SimulationService.deleteSimulationById(simulationId);
      toast.success("Simulación eliminada");
      setSimulations((prev) => prev.filter((s) => s.id !== simulationId));
      closeModal();
    } catch (error) {
      console.error("Error al eliminar simulación:", error);     
    }
  };
  

  const handleCompare = (simulationId) => {
    navigate(`/dashboard/user/comparison/${simulationId}`);
  };

  const openModal = (id) => {
    setSelectedSimulationId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSimulationId(null);
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-16 transition-colors duration-500">
      <div
        className="w-full max-w-5xl p-8 rounded-3xl shadow-2xl border border-white/30 dark:border-white/20 bg-white/30 dark:bg-white/10 backdrop-blur-xl transition-all duration-500 animate-fade-in-down"
        style={{
          background: "rgba(255, 255, 255, 0.25)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.18)",
        }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white animate-fade-in-down">
          🕓 Historial de Simulaciones
        </h2>

        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-300">Cargando historial...</p>
        ) : simulations.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">No se encontraron simulaciones.</p>
        ) : (
          <div className="w-full overflow-auto animate-fade-in-down">
            <table className="w-full text-sm text-left bg-white/30 dark:bg-white/10 backdrop-blur-md rounded-xl border border-gray-300 dark:border-gray-700">
              <thead className="bg-blue-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Ubicación</th>
                  <th className="px-4 py-3">Tipo</th>
                  <th className="px-4 py-3">Energía (kWh)</th>
                  <th className="px-4 py-3">Ahorro (€)</th>
                  <th className="px-4 py-3">Retorno (años)</th>
                  <th className="px-4 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {simulations.map((sim) => (
                  <tr
                    key={sim.id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-md transition-all duration-300"
                  >
                    <td className="px-4 py-2">{new Date(sim.timestamp).toLocaleDateString("es-ES")}</td>
                    <td className="px-4 py-2">{sim.location}</td>
                    <td className="px-4 py-2 capitalize">{sim.energyType}</td>
                    <td className="px-4 py-2">{formatNumber(sim.energyGenerated)}</td>
                    <td className="px-4 py-2">€ {formatNumber(sim.estimatedSavings)}</td>
                    <td className="px-4 py-2">
                      {sim.returnOnInvestment !== undefined ? (
                        <span
                          className={`font-semibold ${sim.returnOnInvestment <= 3
                            ? "text-green-600"
                            : sim.returnOnInvestment <= 6
                              ? "text-yellow-600"
                              : "text-red-600"
                            }`}
                          title={`Retorno estimado: ${sim.returnOnInvestment.toFixed(2)} años`}
                        >
                          {sim.returnOnInvestment.toFixed(2)} años{" "}
                          {sim.returnOnInvestment <= 3
                            ? "🟢"
                            : sim.returnOnInvestment <= 6
                              ? "🟡"
                              : "🔴"}
                        </span>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="px-4 py-2 flex space-x-2 relative">
                      <Tooltip text="Eliminar simulación">
                        <button
                          onClick={() => openModal(sim.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          aria-label="Eliminar simulación"
                        >
                          <FaTrash />
                        </button>
                      </Tooltip>

                      <Tooltip text="Comparar simulación">
                        <button
                          onClick={() => handleCompare(sim.id)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          aria-label="Comparar simulación"
                        >
                          <FaChartBar />
                        </button>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <ConfirmModal
          isOpen={showModal}
          title="Eliminar simulación"
          description="Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar esta simulación?"
          confirmText="Eliminar"
          cancelText="Cancelar"
          onClose={closeModal}
          onConfirm={() => handleDelete(selectedSimulationId)}
        />

      </div>
    </div>
  );
};

export default SimulationHistory;




