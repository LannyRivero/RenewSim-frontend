

export const estimateProjectSize = (monthlyConsumption) => {
    const size = monthlyConsumption / 100;
    return Math.max(1, Math.min(size, 1000)); 
  };
  
  
  export const estimateBudget = (projectSize, energyType) => {
    const costPerKW = {
      solar: 1000,
      wind: 1400,
      hydro: 2500,      
    };
  
    const price = costPerKW[energyType.toLowerCase()] || 1000;
    return Math.round(projectSize * price);
  };
  
  
  