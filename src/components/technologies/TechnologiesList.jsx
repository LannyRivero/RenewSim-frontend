import React, { useEffect, useState } from "react";
import axios from "axios";

const TechnologiesList = ({ simulationId }) => {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8080/api/v1/simulation/${simulationId}/technologies`,

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTechnologies(response.data);
      } catch (err) {
        console.error("❌ Error al obtener tecnologías:", err);
        setError("No se pudieron cargar las tecnologías asociadas.");
      } finally {
        setLoading(false);
      }
    };

    if (simulationId) {
      fetchTechnologies();
    }
  }, [simulationId]);

  if (loading) return <p>Cargando tecnologías asociadas...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!technologies.length) return <p>No se encontraron tecnologías asociadas.</p>;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-gray-700 dark:text-gray-100 mb-4">
        Tecnologías asociadas a esta simulación
      </h3>
      <ul className="space-y-3">
        {technologies.map((tech, index) => (
          <li
            key={index}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col sm:flex-row justify-between items-start sm:items-center"
          >
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white">{tech.technologyName}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Eficiencia: {tech.efficiency} | CO₂ reducido: {tech.co2Reduction} kg
              </p>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Coste instalación: €{tech.installationCost.toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TechnologiesList;


