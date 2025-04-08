import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationForm from "@/components/forms/SimulationForm";
import SimulationResults from "@/components/result/SimulationResults";
import SimulationService from "@/services/SimulationService";
import TechnologiesList from "@/components/technologies/TechnologiesList";
import TechnologyRecommendation from "@/components/recommendation/TechnologyRecommendation";
import { useSimulation } from "@/context/SimulationContext";
import SkeletonLoader from "@/components/common/SkeletonLoader";

const SimulationPage = () => {
  const [resultados, setResultados] = useState(null);
  const [unidad, setUnidad] = useState("kWh");
  const [loading, setLoading] = useState(false);
  const { setSimulationId } = useSimulation();

  const manejarSimulacion = async (data, unidadSeleccionada) => {
    console.log("🚀 Ejecutando simulación con:", data);

    setLoading(true);
    setResultados(null);
    try {
      const response = await SimulationService.simulate(data);
      console.log("✅ Respuesta de simulación:", response);

      setResultados(response);
      setUnidad(unidadSeleccionada);
      setSimulationId(response.simulationId);
    } catch (error) {
      console.error("❌ Error en la simulación:", error);
      alert("Hubo un problema al ejecutar la simulación.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-8 transition-colors duration-500">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`w-full max-w-2xl p-6 md:p-10 rounded-3xl shadow-2xl border border-white/30 dark:border-white/20 bg-white/30 dark:bg-white/10 backdrop-blur-xl transition-all duration-500 ${
          resultados ? "transform scale-95 -translate-y-4" : ""
        }`}
        style={{
          background: "rgba(255, 255, 255, 0.25)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.18)",
        }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-1 transition-colors duration-500">
          Datos para la simulación
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-300 text-sm mb-6 md:mb-8">
          Introduce los datos del proyecto para estimar el rendimiento energético.
        </p>

        <SimulationForm onSubmit={manejarSimulacion} />

        {loading && <SkeletonLoader />}

        <AnimatePresence>
          {!loading && resultados && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.7, ease: "easeOut", type: "spring", stiffness: 80 }}
              className="mt-8 space-y-8 p-6 rounded-3xl bg-white/30 dark:bg-white/10 backdrop-blur-xl shadow-xl border border-white/30 dark:border-white/20 transition-all duration-500"
              style={{
                background: "rgba(255, 255, 255, 0.25)",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                backdropFilter: "blur(15px)",
                WebkitBackdropFilter: "blur(15px)",
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.18)",
              }}
            >
              <SimulationResults data={resultados} unidad={unidad} />
              <TechnologiesList simulationId={resultados.simulationId} />
              <TechnologyRecommendation resultados={resultados} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SimulationPage;





