import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const SimulationHistory = () => {
  const { token } = useAuth();
  const [simulations, setSimulations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimulations = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/simulation/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Ordenar por fecha descendente
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

    fetchSimulations();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        🕓 Hitorial de Simulaciones
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
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {simulations.map((sim) => (
                <tr key={sim.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {new Date(sim.timestamp).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{sim.location}</td>
                  <td className="px-4 py-2 capitalize">{sim.energyType}</td>
                  <td className="px-4 py-2">{sim.energyGenerated?.toFixed(2)}</td>
                  <td className="px-4 py-2">{sim.estimatedSavings?.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    {sim.returnOnInvestment !== undefined ? (
                      <span
                        className={`font-semibold ${sim.returnOnInvestment <= 3
                            ? "text-green-600"
                            : sim.returnOnInvestment <= 6
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
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



                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SimulationHistory;

