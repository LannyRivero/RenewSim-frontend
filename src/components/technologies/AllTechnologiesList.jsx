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

  const openModal = (id) => {
    setSelectedTechId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTechId(null);
  };

  const handleDelete = async (technologyId) => {
    try {
      await TechnologyService.deleteTechnologyById(technologyId);
      toast.success("Tecnología eliminada correctamente");
      setTechnologies((prev) => prev.filter((t) => t.id !== technologyId));
      closeModal();
    } catch (error) {
      console.error("Error al eliminar tecnología:", error);
      toast.error("No se pudo eliminar la tecnología");
    }
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/admin/technologies/edit/${id}`);
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
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex justify-between items-center"
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
            <div className="flex gap-4 text-lg">
              <Tooltip text="Editar tecnología">
                <button
                  onClick={() => handleEdit(tech.id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit />
                </button>
              </Tooltip>
              <Tooltip text="Eliminar tecnología">
                <button
                  onClick={() => openModal(tech.id)}
                  className="text-red-600 hover:text-red-800"
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
    </div>
  );
};

export default AllTechnologiesList;




