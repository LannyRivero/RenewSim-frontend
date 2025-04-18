import React, { useEffect, useState } from "react";
import TechnologyService from "@/services/TechnologyService"; 

const AllTechnologiesList = () => {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const response = await TechnologyService.getAllTechnologies();
        setTechnologies(response);
      } catch (err) {
        console.error("❌ Error al obtener tecnologías:", err);
        setError("No se pudieron cargar las tecnologías.");
      } finally {
        setLoading(false);
      }
    };

    fetchTechnologies();
  }, []);

  if (loading) return <p>Cargando tecnologías...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!technologies.length) return <p>No hay tecnologías registradas.</p>;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-gray-700 dark:text-gray-100 mb-4">
        Tecnologías Registradas
      </h3>
      <ul className="space-y-3">
        {technologies.map((tech) => (
          <li
            key={tech.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col sm:flex-row justify-between items-start sm:items-center"
          >
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white">{tech.technologyName}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Tipo: {tech.energyType} | Eficiencia: {tech.efficiency} | CO₂ reducido: {tech.co2Reduction} kg
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

export default AllTechnologiesList;
