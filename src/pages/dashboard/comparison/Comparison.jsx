// src/pages/Comparison.jsx

import React from 'react';
import { useParams } from "react-router-dom";
import TechnologiesComparison from '@/components/technologies/TechnologiesComparison';

const Comparison = () => {
    const { simulationId } = useParams();
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Energy Source Comparison</h1>
      <p className="mb-6 text-gray-700">
        Compare the performance, cost, and environmental impact of different renewable energy sources.
      </p>
      <TechnologiesComparison simulationId={simulationId}/>
    </div>
  );
};

export default Comparison;
