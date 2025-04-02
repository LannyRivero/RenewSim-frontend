import React, { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import SimulationForm from "@/components/forms/SimulationForm";
import SimulationResults from "@/components/result/SimulationResults";
import SimulationService from "@/services/SimulationService";
import SimulationTable from "@/components/user/SimulationTable";

const UserDashboard = () => {
  const [simulations, setSimulations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [resultados, setResultados] = useState(null);
  const [unidad, setUnidad] = useState("kWh");

  const handleSimulacion = async (formData) => {
    try {
      const response = await SimulationService.simulate(formData);
      setResultados(response);
      setUnidad(formData.consumptionUnit || "kWh");

      // También guardamos en historial
      const nuevaSimulacion = {
        ...formData,
        result: response,
        date: new Date().toISOString(),
      };
      setSimulations((prev) => [...prev, nuevaSimulacion]);
      setShowForm(false); // Opcional: oculta el form y muestra tabla
    } catch (error) {
      console.error("❌ Error en la simulación:", error);
      alert("Hubo un problema al ejecutar la simulación.");
    }
  };

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-semibold text-green-700 mb-4">Bienvenido al panel de simulación 👋</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Aquí puedes realizar simulaciones, ver resultados y consultar tu historial.
      </p>

      {/* Botón para cambiar entre formulario y tabla */}
      <div className="mb-6">
        <button
          onClick={() => {
            setShowForm(!showForm);
            setResultados(null); // Limpia resultados si se vuelve a simular
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          {showForm ? "Volver al historial" : "Nueva Simulación"}
        </button>
      </div>

      {/* Formulario + resultados */}
      {showForm ? (
        <>
          <SimulationForm onSubmit={handleSimulacion} />
          {resultados && (
            <div className="mt-10">
              <SimulationResults data={resultados} unidad={unidad} />
            </div>
          )}
        </>
      ) : (
        <SimulationTable simulations={simulations} />
      )}
    </DashboardLayout>
  );
};

export default UserDashboard;
