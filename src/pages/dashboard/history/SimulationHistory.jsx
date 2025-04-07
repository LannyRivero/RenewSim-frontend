import React, { useEffect, useState, Fragment } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom"; // 🔥 NUEVO: Necesario para navegación
import { FaTrash } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa"; // 🔥 NUEVO: Icono de comparación
import ConfirmModal from "@/components/modals/ConfirmModal";
import SimulationService from "@/services/SimulationService";

const formatNumber = (value) =>
  new Intl.NumberFormat("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const SimulationHistory = () => {
  const { token } = useAuth();
  const navigate = useNavigate(); // 🔥 NUEVO
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

  const handleDelete = async () => {
    try {
      await SimulationService.deleteSimulationById(selectedSimulationId);
      setSimulations(simulations.filter(sim => sim.id !== selectedSimulationId));
      closeModal();
    } catch (error) {
      console.error("❌ Error al eliminar la simulación:", error);
    }
  };

  // 🔥 NUEVO: Navegar a la comparación
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
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        🕓 Historial de Simulaciones
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Cargando historial...</p>
      ) : simulations.length === 0 ? (
        <p className="text-center text-gray-500">No se encontraron simulaciones.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-blue-100 text-gray-700 uppercase text-xs">
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
            <tbody className="divide-y divide-gray-200">
              {simulations.map((sim) => (
                <tr key={sim.id} className="hover:bg-gray-50">
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
                  <td className="px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => openModal(sim.id)}
                      className="text-red-600 hover:text-red-800"
                      aria-label="Eliminar simulación"
                    >
                      <FaTrash />
                    </button>
                    <button
                      onClick={() => handleCompare(sim.id)}
                      className="text-blue-600 hover:text-blue-800"
                      aria-label="Comparar simulación"
                    >
                      <FaChartBar />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de confirmación */}
      <ConfirmModal
        isOpen={showModal}
        title="Eliminar simulación"
        description="Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar esta simulación?"
        confirmText="Eliminar"
        cancelText="Cancelar"
        onCancel={closeModal}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default SimulationHistory;

