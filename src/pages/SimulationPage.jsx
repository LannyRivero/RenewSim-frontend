import React from "react";
import SimulationForm from "../components/forms/SimulationForm";

const SimulationPage = ({ onSubmit }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gree-60 px-4 py-12">
      <div className="w-full max-w-2xl p-10 rounded-2xl shadow-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-1">
          Datos para la simulación
        </h2>
        <p className="text-center text-gray-500 text-sm mb-8">
          Introduce los datos del proyecto para estimar el rendimiento energético.
        </p>

        <SimulationForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default SimulationPage;
