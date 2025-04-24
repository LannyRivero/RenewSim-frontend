import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import Tooltip from "@/components/common/Tooltip";
import ConfirmModal from "@/components/modals/ConfirmModal";
import TechnologyService from "@/services/TechnologyService";
import { useNavigate } from "react-router-dom";
import ModalBase from "@/components/modals/ModalBase";
import TechnologyEditForm from "@/components/forms/TechnologyEditForm";


const AllTechnologiesList = () => {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedTechId, setSelectedTechId] = useState(null);
  const [selectedTechName, setSelectedTechName] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [technologyToEdit, setTechnologyToEdit] = useState(null);



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

  const openModal = (id, name) => {
    console.log("🧪 ID recibido en openModal:", id);
    setSelectedTechId(id);
    setSelectedTechName(name);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTechId(null);
    setSelectedTechName("");
    setConfirming(false);
  };

  const handleDelete = async (technologyId) => {
    try {
      await TechnologyService.deleteTechnologyById(technologyId);
      toast.success("Tecnología eliminada correctamente");
      setTechnologies((prev) => prev.filter((t) => t.id !== technologyId));
      closeModal();
    } catch (error) {
      console.error("Error al eliminar tecnología:", error);

      if (error.response?.status === 400 || error.response?.status === 500) {
        const backendMessage = error.response?.data?.message || error.message;
        toast.error(`❌ No se puede eliminar: ${backendMessage}`);
      } else {
        toast.error("Error inesperado al eliminar la tecnología.");
      }
    }
  };

  const confirmDeletion = () => {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    handleDelete(selectedTechId);
    setConfirming(false);
  };

  const openEditModal = (id) => {
    setTechnologyToEdit(id);
    setShowEditModal(true);
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
        {technologies.map((tech) => {
          return (
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
              <div className="flex gap-4 text-lg items-center">
                <Tooltip text="Editar tecnología">
                  <button
                    onClick={() => openEditModal(tech.id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                </Tooltip>

                {tech.inUse ? (
                  <Tooltip text="No se puede eliminar porque está asociada a una simulación">
                    <button
                      disabled
                      className="text-gray-400 cursor-not-allowed"
                    >
                      <FaTrash />
                    </button>
                  </Tooltip>
                ) : (
                  <Tooltip text="Eliminar tecnología">
                    <button
                      onClick={() => openModal(tech.id, tech.technologyName)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </Tooltip>
                )}

                {tech.inUse && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-red-100 text-red-600 rounded-full">
                    🔒 En uso
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <ConfirmModal
        isOpen={showModal}
        title="Eliminar tecnología"
        description={
          confirming
            ? `⚠️ Esta acción eliminará permanentemente la tecnología "${selectedTechName}". ¿Estás absolutamente seguro?`
            : `¿Estás seguro de que deseas eliminar la tecnología "${selectedTechName}"? Esta acción no se puede deshacer.`
        }
        confirmText={confirming ? "Sí, eliminar definitivamente" : "Eliminar"}
        cancelText="Cancelar"
        onClose={() => {
          closeModal();
          setConfirming(false);
        }}
        onConfirm={confirmDeletion}
      />
      <ModalBase
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Editar Tecnología"
      >
        <TechnologyEditForm
          technologyId={technologyToEdit}
          onClose={() => setShowEditModal(false)}
          onSaved={() => {
            setShowEditModal(false);
            fetchTechnologies(); 
          }}
        />
      </ModalBase>


    </div>
  );
};

export default AllTechnologiesList;






