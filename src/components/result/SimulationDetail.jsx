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

    if (loading) return <p className="text-center">Cargando...</p>;
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
    } = simulation;

    return (
        <div className="max-w-5xl mx-auto p-6 mt-10 bg-white dark:bg-slate-800 rounded-3xl shadow-lg animate-fade-in-down">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
                📊 Detalles de la Simulación
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-700 rounded-xl p-4 shadow-md border border-gray-200 dark:border-gray-600">
                    <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">📅 Información General</h3>
                    <p><strong>Fecha:</strong> {new Date(timestamp).toLocaleDateString("es-ES")}</p>
                    <p><strong>Ubicación:</strong> {location}</p>
                    <p><strong>Tipo de energía:</strong> {energyType}</p>
                    <p><strong>Generación estimada:</strong> {energyGenerated.toLocaleString()} kWh ⚡</p>
                    <p><strong>Ahorro estimado:</strong> {estimatedSavings.toLocaleString()} € 💶</p>
                    <p><strong>ROI:</strong> <span className={`font-semibold ${returnOnInvestment <= 3 ? "text-green-600" : returnOnInvestment <= 6 ? "text-yellow-600" : "text-red-600"}`}>{returnOnInvestment.toFixed(2)} años</span></p>
                    <p><strong>Tamaño del proyecto:</strong> {projectSize} kW</p>
                    <p><strong>Presupuesto estimado:</strong> {budget?.toLocaleString() ?? "Sin datos"} €</p>
                </div>

                <div className="bg-white dark:bg-slate-700 rounded-xl p-4 shadow-md border border-gray-200 dark:border-gray-600">
                    <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">💡 Tecnologías Utilizadas</h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                        {technologies?.map((tech, idx) => (
                            <li key={idx} className="mb-1">
                                <span className="font-semibold">{tech.technologyName}</span> — Eficiencia: {tech.efficiency}, CO₂: {tech.co2Reduction} kg, Costo: {tech.installationCost} €
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="my-6">
                <EstimatedBudgetBreakdown
                    energyType={energyType}
                    projectSize={projectSize}
                    budget={budget}
                />
            </div>
            {simulation.recommendedTechnology && (
                <div className="my-6 bg-green-100 dark:bg-green-800 text-green-900 dark:text-green-100 rounded-xl p-4 shadow-lg border border-green-300 dark:border-green-700 text-center">
                    <h3 className="text-xl font-bold mb-2">✅ Tecnología Recomendada</h3>
                    <p className="text-lg">
                        <span className="font-semibold">{simulation.recommendedTechnology}</span> fue seleccionada como la mejor opción para esta simulación según tus parámetros de entrada.
                    </p>
                </div>
            )}


            <div className="mt-6 text-center">
                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                >
                    ← Volver
                </button>
            </div>
        </div>
    );
};

export default SimulationDetail;



