

export const estimateProjectSize = (monthlyConsumption) => {
    // Supongamos que 1 kW cubre 100 kWh/mes
    return Math.max(1, Math.round(monthlyConsumption / 100));
  };
  
  export const estimateBudget = (projectSize) => {
    // Supongamos que 1 kW cuesta 1000 €
    return projectSize * 1000;
  };
  