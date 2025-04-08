import React from 'react';
import { useParams } from "react-router-dom";
import TechnologiesComparison from '@/components/technologies/TechnologiesComparison';

const Comparison = () => {
  const { simulationId } = useParams();

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
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white text-center">
          ⚡ Comparación de Energías Renovables
        </h1>
        <p className="mb-8 text-gray-700 dark:text-gray-300 text-center">
          Analiza el rendimiento, el coste y el impacto ambiental de diferentes fuentes de energía renovable.
        </p>

        <TechnologiesComparison simulationId={simulationId} />
      </div>
    </div>
  );
};

export default Comparison;

