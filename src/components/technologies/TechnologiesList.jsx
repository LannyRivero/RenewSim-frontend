import React, { useEffect, useState } from "react";
import axios from "axios";

const TechnologiesList = ({ simulationId }) => {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/technology/by-simulation/${simulationId}`);
        setTechnologies(response.data);
      } catch (err) {
        console.error("Error al cargar tecnologías:", err);
        setError("No se pudieron cargar las tecnologías asociadas.");
      } finally {
        setLoading(false);
      }
    };

    if (simulationId) {
      fetchTechnologies();
    }
  }, [simulationId]);

  if (loading) {
    return <p className="text-blue-600 font-medium">Cargando tecnologías...</p>;
  }

  if (error) {
    return <p className="text-red-600 font-medium">{error}</p>;
  }

  if (technologies.length === 0) {
    return <p className="text-gray-500">No se encontraron tecnologías asociadas para esta simulación.</p>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
        Tecnologías evaluadas
      </h4>
      <ul className="space-y-2">
        {technologies.map((tech) => (
          <li
            key={tech.id}
            className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700"
          >
            <p className="text-gray-800 dark:text-gray-200 font-medium">{tech.technologyName}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Eficiencia: {tech.efficiency} | Coste instalación: €{tech.installationCost} | Impacto: {tech.environmentalImpact}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TechnologiesList;
