import React, { useState } from "react";
import SimulationForm from "@/components/forms/SimulationForm";
import SimulationResults from "@/components/result/SimulationResults";
import SimulationService from "@/services/SimulationService";
import TechnologiesList from "@/components/technologies/TechnologiesList";
import TechnologyRecommendation from "@/components/recommendation/TechnologyRecommendation";
import { useSimulation } from "@/context/SimulationContext"; 

const SimulationPage = () => {
  const [resultados, setResultados] = useState(null);
  const [unidad, setUnidad] = useState("kWh");
  const { setSimulationId } = useSimulation();

  const manejarSimulacion = async (data, unidadSeleccionada) => {
    console.log("🚀 Ejecutando simulación con:", data);

    try {
      const response = await SimulationService.simulate(data);
      console.log("✅ Respuesta de simulación:", response);

      setResultados(response);
      setUnidad(unidadSeleccionada);

      //Guarda el simulationId en el contexto global + localStorage
      setSimulationId(response.simulationId);

    } catch (error) {
      console.error("❌ Error en la simulación:", error);
      alert("Hubo un problema al ejecutar la simulación.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-2xl p-10 rounded-2xl shadow-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-1">
          Datos para la simulación
        </h2>
        <p className="text-center text-gray-500 text-sm mb-8">
          Introduce los datos del proyecto para estimar el rendimiento energético.
        </p>

        <SimulationForm onSubmit={manejarSimulacion} />

        {resultados && (
          <div className="mt-10 space-y-8">
            <SimulationResults data={resultados} unidad={unidad} />
            <TechnologiesList simulationId={resultados.simulationId} />

            <TechnologyRecommendation resultados={resultados} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SimulationPage;
