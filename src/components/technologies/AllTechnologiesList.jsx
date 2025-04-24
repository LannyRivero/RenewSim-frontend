import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import Tooltip from "@/components/common/Tooltip";
import ConfirmModal from "@/components/modals/ConfirmModal";
import TechnologyService from "@/services/TechnologyService";
import { useNavigate } from "react-router-dom";

const AllTechnologiesList = () => {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedTechId, setSelectedTechId] = useState(null);
  const navigate = useNavigate();

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

  const handleEdit = (id) => {
    navigate(`/dashboard/admin/technologies/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await TechnologyService.deleteTechnology(id);
      toast.success("Tecnología eliminada correctamente");
      setTechnologies((prev) => prev.filter((t) => t.id !== id));
      closeModal();
    } catch (error) {
      console.error("Error al eliminar tecnología:", error);
      toast.error("No se pudo eliminar la tecnología");
    }
  };

  const openModal = (id) => {
    setSelectedTechId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTechId(null);
  };

  if (loading) return <p className="text-center">Cargando tecnologías...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!technologies.length) return <p className="text-center">No hay tecnologías registradas.</p>;

  return (
    <div className="mt-8">
      <h3 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        ⚡ Tecnologías Registradas
      </h3>
      <ul className="space-y-4">
        {technologies.map((tech) => (
          <li
            key={tech.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center transition hover:shadow-lg"
          >
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{tech.technologyName}</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Tipo: {tech.energyType} | Eficiencia: {tech.efficiency} | CO₂ reducido: {tech.co2Reduction} kg
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Coste instalación estimado (10 kW): €{tech.installationCost.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4 sm:mt-0 sm:ml-4">
              <Tooltip text="Editar tecnología">
                <button
                  onClick={() => handleEdit(tech.id)}
                  className="text-blue-600 hover:text-blue-800 text-lg"
                  aria-label="Editar tecnología"
                >
                  <FaEdit />
                </button>
              </Tooltip>
              <Tooltip text="Eliminar tecnología">
                <button
                  onClick={() => openModal(tech.id)}
                  className="text-red-600 hover:text-red-800 text-lg"
                  aria-label="Eliminar tecnología"
                >
                  <FaTrash />
                </button>
              </Tooltip>
            </div>
          </li>
        ))}
      </ul>

      <ConfirmModal
        isOpen={showModal}
        title="Eliminar tecnología"
        description="Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar esta tecnología?"
        confirmText="Eliminar"
        cancelText="Cancelar"
        onClose={closeModal}
        onConfirm={() => handleDelete(selectedTechId)}
      />

      <p className="mt-6 text-xs text-gray-500 dark:text-gray-400 italic text-center">
        * Costes estimados según datos de IRENA, IEA y Eurostat para instalaciones de 10 kW.
      </p>
    </div>
  );
};

export default AllTechnologiesList;



