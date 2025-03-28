import React from 'react';
import SimulationForm from '../components/forms/SimulationForm';

const SimulationPage = () => {
  const handleSimulationSubmit = (data) => {
    console.log("Datos recibidos para simulación:", data);
    // Aquí haces la petición al backend o lógica adicional
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SimulationForm onSubmit={handleSimulationSubmit} />
    </div>
  );
};

export default SimulationPage;
