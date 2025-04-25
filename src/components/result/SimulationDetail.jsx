import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SimulationService from "@/services/SimulationService";
import EstimatedBudgetBreakdown from "@/components/result/EstimatedBudgetBreakdown";
import TechnologyRecommendation from "@/components/recommendation/TechnologyRecommendation";

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
    <div className="p-6 max-w-6xl mx-auto mt-10 bg-white/90 dark:bg-slate-800 rounded-xl shadow-xl animate-fade-in-down space-y-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">📊 Detalles de la Simulación</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="border border-green-500 bg-green-50 dark:bg-green-900 p-6 rounded-lg shadow-md col-span-1">
          <h3 className="text-xl font-semibold text-green-700 dark:text-blue-300 mb-4 flex items-center gap-2">
            🧾 Información General
          </h3>
          <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-xl shadow-md border border-blue-200 dark:border-blue-700">
            <p><strong>📅 Fecha:</strong> {new Date(timestamp).toLocaleDateString("es-ES")}</p>
            <p><strong>📍 Ubicación:</strong> {location}</p>
            <p><strong>⚡ Tipo de energía:</strong> {energyType}</p>
            <p><strong>🔋 Generación estimada:</strong> {formatNumber(energyGenerated)} kWh</p>
            <p><strong>💶 Ahorro estimado:</strong> {formatNumber(estimatedSavings)} €</p>
            <p><strong>⏳ Retorno de Inversión:</strong> {returnOnInvestment.toFixed(2)} años</p>
            <p><strong>📏 Tamaño del proyecto:</strong> {projectSize} kW</p>
            <p><strong>💰 Presupuesto estimado:</strong> {budget} €</p>
          </div>

        </div>
        <div className="border border-green-500 bg-green-50 dark:bg-green-900 p-6 rounded-lg shadow-md col-span-1">
          <h3 className="text-xl font-semibold text-green-700 dark:text-blue-300 mb-4 flex items-center gap-2">
            💡 Tecnologías Utilizadas
          </h3>
          <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-xl shadow-md border border-blue-200 dark:border-blue-700">

            <ul className="list-disc list-inside text-gray-800 dark:text-gray-100">
              {technologies.map((tech, idx) => (
                <li key={idx}>
                  <strong>{tech.technologyName}</strong> — Eficiencia: {tech.efficiency}, CO₂: {tech.co2Reduction} kg, Costo: {tech.installationCost} €
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="border border-green-500 bg-green-50 dark:bg-green-900 p-6 rounded-lg shadow-md col-span-1">
          <h3 className="text-xl font-semibold mb-2 text-green-700 dark:text-green-300">🏆 Tecnología Recomendada</h3>
          <TechnologyRecommendation resultados={{ recommendedTechnology }} modo="resumen" />
        </div>
      </div>

      <EstimatedBudgetBreakdown
        energyType={energyType}
        projectSize={projectSize}
        budget={budget}
      />

      <div className="mt-6 text-center">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition"
        >
          ← Volver al historial
        </button>
      </div>
    </div>
  );
};

export default SimulationDetail;




