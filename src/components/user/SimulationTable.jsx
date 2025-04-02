import React from "react";

const SimulationTable = ({ simulations }) => {
  if (!simulations || simulations.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-300">
        No se encontraron simulaciones.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full table-auto bg-white dark:bg-gray-800 shadow rounded-xl">
        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Fecha</th>
            <th className="px-4 py-2 text-left">Ubicación</th>
            <th className="px-4 py-2 text-left">Energía</th>
            <th className="px-4 py-2 text-left">Tamaño (kW)</th>
            <th className="px-4 py-2 text-left">Consumo mensual</th>
            <th className="px-4 py-2 text-left">Presupuesto (€)</th>
          </tr>
        </thead>
        <tbody>
          {simulations.map((sim, idx) => (
            <tr
              key={idx}
              className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td className="px-4 py-2">{new Date(sim.date).toLocaleDateString()}</td>
              <td className="px-4 py-2">{sim.location}</td>
              <td className="px-4 py-2 capitalize">{sim.energyType}</td>
              <td className="px-4 py-2">{sim.projectSize} kW</td>
              <td className="px-4 py-2">{sim.monthlyConsumption} kWh</td>
              <td className="px-4 py-2">€{sim.budget}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SimulationTable;
