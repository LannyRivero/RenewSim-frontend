import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { FaTrash } from "react-icons/fa"; // Icono para eliminar
import { Dialog } from "@headlessui/react"; // Modal sencillo y limpio

const formatNumber = (value) =>
  new Intl.NumberFormat("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const SimulationHistory = () => {
  const { token } = useAuth();
  const [simulations, setSimulations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedSimulationId, setSelectedSimulationId] = useState(null);

  // Fetch simulations
  useEffect(() => {
    fetchSimulations();
  }, [token]);

  const fetchSimulations = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/simulation/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const sorted = response.data.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
      setSimulations(sorted);
    } catch (error) {
      console.error("❌ Error al obtener el historial:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle modal
  const openModal = (id) => {
    setSelectedSimulationId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSimulationId(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/simulation/${selectedSimulationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSimulations(simulations.filter(sim => sim.id !== selectedSimulationId));
      closeModal();
    } catch (error) {
      console.error("❌ Error al eliminar la simulación:", error);
    }
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
                  <td className="px-4 py-2">
                    <button onClick={() => openModal(sim.id)} className="text-red-600 hover:text-red-800">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de Confirmación */}
      {showModal && (
        <Dialog open={showModal} onClose={closeModal} className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
            className="bg-white rounded-lg shadow-xl p-6 max-w-sm mx-auto"
          >
            <h2 id="dialog-title" className="text-lg font-bold text-gray-800">
              Eliminar simulación
            </h2>
            <p id="dialog-description" className="text-gray-600 mt-2">
              Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar esta simulación?
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <button onClick={closeModal} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                Cancelar
              </button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                Eliminar
              </button>
            </div>
          </div>

        </Dialog>
      )}



    </div>
  );
};

export default SimulationHistory;
