import React from "react";

const SimulationResults = ({ data }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 space-y-2">
      <h3 className="text-xl font-bold text-gray-800">Simulation Results</h3>
      <p><strong>Annual Energy Generated:</strong> {data.energiaGenerada?.toFixed(2)} kWh</p>
      <p><strong>Estimated Savings:</strong> {data.ahorroEstimado?.toFixed(2)} €</p>
      <p><strong>Return on Investment:</strong> {data.retornoInversion} years</p>
    </div>
  );
};

export default SimulationResults;

