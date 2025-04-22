import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SimulationService from "@/services/SimulationService";
import EstimatedBudgetBreakdown from "@/components/result/EstimatedBudgetBreakdown";

const SimulationDetail = () => {
  const { simulationId } = useParams();
  const navigate = useNavigate();
  const [simulation, setSimulation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSimulation = async () => {
      try {
        const data = await SimulationService.getSimulationById(simulationId);
        setSimulation(data);
      } catch (err) {
        setError("Error loading simulation details");
      } finally {
        setLoading(false);
      }
    };

    fetchSimulation();
  }, [simulationId]);

  if (loading) return <p className="text-center">Cargando detalles...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!simulation) return null;

  const {
    location,
    energyType,
    energyGenerated,
    estimatedSavings,
    returnOnInvestment,
    projectSize,
    budget,
    timestamp,
    technologies,
    recommendedTechnology
  } = simulation;

  const formatNumber = (n) =>
    new Intl.NumberFormat("es-ES", { maximumFractionDigits: 1 }).format(n);

  return (
    <div className="p-6 max-w-6xl mx-auto mt-10 bg-white rounded-xl shadow-md dark:bg-slate-800 animate-fade-in-down">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">📊 Detalles de la Simulación</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Información General */}
        <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-md col-span-1">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">🧾 Información General</h3>
          <p><strong>📅 Fecha:</strong> {new Date(timestamp).toLocaleDateString("es-ES")}</p>
          <p><strong>📍 Ubicación:</strong> {location}</p>
          <p><strong>⚡ Tipo de energía:</strong> {energyType}</p>
          <p><strong>🔋 Generación estimada:</strong> {formatNumber(energyGenerated)} kWh</p>
          <p><strong>💶 Ahorro estimado:</strong> {formatNumber(estimatedSavings)} €</p>
          <p><strong>⏳ ROI:</strong> {returnOnInvestment.toFixed(2)} años</p>
          <p><strong>📏 Tamaño del proyecto:</strong> {projectSize} kW</p>
          <p><strong>💰 Presupuesto estimado:</strong> {budget} €</p>
        </div>

        {/* Tecnologías utilizadas */}
        <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-md col-span-1">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">💡 Tecnologías Utilizadas</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            {technologies.map((tech, idx) => (
              <li key={idx}>
                <strong>{tech.technologyName}</strong> — Eficiencia: {tech.efficiency}, CO₂: {tech.co2Reduction} kg, Costo: {tech.installationCost} €
              </li>
            ))}
          </ul>
        </div>

        {/* Tecnología Recomendada */}
        <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-md col-span-1">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">🏆 Tecnología Recomendada</h3>
          <p className="text-lg text-green-600 dark:text-green-400 font-bold mb-2">
            ✅ {recommendedTechnology}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Esta tecnología fue recomendada por ofrecer el mejor equilibrio entre eficiencia energética, coste de instalación y reducción de CO₂, según el tamaño del proyecto y el tipo de energía seleccionado.
          </p>
        </div>
      </div>

      {/* Visualización con D3 */}
      <EstimatedBudgetBreakdown
        energyType={energyType}
        projectSize={projectSize}
        budget={budget}
      />

      {/* Botón de volver */}
      <div className="mt-6 text-center">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          ← Volver
        </button>
      </div>
    </div>
  );
};

export default SimulationDetail;




