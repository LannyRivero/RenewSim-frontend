import React, { createContext, useContext, useState } from 'react';



// Crear contexto
const SimulationContext = createContext();

// Hook personalizado para consumir el contexto
export const useSimulation = () => useContext(SimulationContext);

// Provider
export const SimulationProvider = ({ children }) => {
  const [simulationIdState, setSimulationIdState] = useState(() => {
    return localStorage.getItem("simulationId") || null;
  });

  const setSimulationId = (id) => {
    setSimulationIdState(id);
    if (id) {
      localStorage.setItem("simulationId", id);
    } else {
      localStorage.removeItem("simulationId");
    }
  };

  return (
    <SimulationContext.Provider value={{ simulationId: simulationIdState, setSimulationId }}>
      {children}
    </SimulationContext.Provider>
  );
};

