import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SimulationService from "@/services/SimulationService";
import Button from "@/components/common/button/Button";
import ConfirmModal from "@/components/modals/ConfirmModal";
import ExportCSVButton from "@/components/common/ExportCSVButton";
import SubmitTestimonialModal from "@/components/modals/SubmitTestimonialModal";
import ChangePasswordModal from "@/components/modals/ChangePasswordModal";




const UserSettings = () => {
  const [showModal, setShowModal] = useState(false);
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);
  const [simulations, setSimulations] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);


  const navigate = useNavigate();

  useEffect(() => {
    fetchSimulations();
    loadTestimonials();
  }, []);

  const fetchSimulations = async () => {
    try {
      const data = await SimulationService.getUserSimulations();
      setSimulations(data);
    } catch (error) {
      console.error("Error al obtener simulaciones:", error);
    }
  };

  const loadTestimonials = () => {
    const stored = JSON.parse(localStorage.getItem("testimonials")) || [];
    setTestimonials(stored);
  };

  const handleNewTestimonial = (newTestimonial) => {
    setTestimonials((prev) => [...prev, newTestimonial]);
  };

  const handleResetSimulations = async () => {
    setLoadingReset(true);
    try {
      const simulations = localStorage.getItem("userSimulations");
      if (simulations) {
        localStorage.setItem("backupUserSimulations", simulations);
      }

      await SimulationService.deleteUserSimulations();
      localStorage.removeItem("userSimulations");

      toast.success("Historial de simulaciones eliminado ✅");

      setTimeout(() => {
        setLoadingReset(false);
        setShowModal(false);
        navigate("/dashboard/user/history");
      }, 1000);
    } catch (error) {
      console.error("❌ Error al eliminar historial:", error);
      toast.error("Error al eliminar el historial.");
      setLoadingReset(false);
    }
  };

  const formatNiceDate = (isoDate) => {
    const date = new Date(isoDate);
    const now = new Date();

    // Verifica si es hoy
    const isToday = date.toDateString() === now.toDateString();

    // Verifica si es ayer
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();

    const options = { year: "numeric", month: "long", day: "numeric" };

    if (isToday) return "Hoy";
    if (isYesterday) return "Ayer";

    return date.toLocaleDateString("es-ES", options);
  };


  const handleDeleteTestimonial = (indexToDelete) => {
    const updatedTestimonials = testimonials.filter((_, index) => index !== indexToDelete);
    setTestimonials(updatedTestimonials);
    localStorage.setItem("testimonials", JSON.stringify(updatedTestimonials));
    toast.success("Comentario eliminado");
  };

  const handleDeleteAllTestimonials = () => {
    localStorage.removeItem("testimonials");
    setTestimonials([]);
    toast.success("Todos los comentarios han sido eliminados");
  };


  return (
    <div className="min-h-screen flex justify-center items-start bg-gradient-to-br from-green-50 via-white to-green-100 px-4 py-16 transition-colors duration-500">
      <div className="w-full max-w-3xl p-8 rounded-3xl shadow-2xl border border-white/30 bg-white/30 backdrop-blur-xl transition-all duration-500 space-y-10">

        {/* Encabezado general */}
        <h2 className="text-3xl font-bold text-center text-gray-800 animate-fade-in-down flex items-center justify-center gap-2">
          <span role="img" aria-label="config">⚙️</span> Configuración Avanzada
        </h2>


        {/* Reset simulations */}
        <div className="flex items-center justify-between bg-white/50 backdrop-blur-md shadow-lg border border-gray-300 p-4 rounded-xl animate-fade-in-down">
          <span className="text-gray-700">Resetear historial de simulaciones</span>
          <Button variant="danger" onClick={() => setShowModal(true)}>
            Resetear
          </Button>
        </div>

        {/* Export simulations */}
        <div className="flex items-center justify-between bg-white/50 backdrop-blur-md shadow-lg border border-gray-300 p-4 rounded-xl animate-fade-in-down">
          <span className="text-gray-700">Exportar historial de simulaciones</span>
          <ExportCSVButton data={simulations} filename="historial_simulaciones" />
        </div>
        <div className="flex items-center justify-between bg-white/50 backdrop-blur-md shadow-lg border border-gray-300 p-4 rounded-xl animate-fade-in-down">
          <span className="text-gray-700">Cambiar contraseña de usuario</span>
          <Button variant="secondary" onClick={() => setShowChangePasswordModal(true)}>
            Cambiar contraseña
          </Button>
        </div>


        {/* Testimonial button */}
        <div className="flex items-center justify-between bg-white/50 backdrop-blur-md shadow-lg border border-gray-300 p-4 rounded-xl animate-fade-in-down">
          <span className="text-gray-700">Enviar comentario o sugerencia</span>
          <Button variant="secondary" onClick={() => setShowTestimonialModal(true)}>
            Dejar comentario
          </Button>
        </div>

        {/* Testimonial viewer */}
        {/* ... (lo mantienes como ya lo tienes) */}

      </div>

      {/* Modals */}
      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleResetSimulations}
        title="¿Estás seguro?"
        description="Esta acción eliminará todo el historial de simulaciones. Se guardará una copia de seguridad por si la necesitas."
        confirmText="Confirmar"
        cancelText="Cancelar"
        loading={loadingReset}
      />

      <SubmitTestimonialModal
        isOpen={showTestimonialModal}
        onClose={() => setShowTestimonialModal(false)}
        onNewTestimonial={handleNewTestimonial}
      />
      <ChangePasswordModal
        isOpen={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
      />

    </div>
  );
};
export default UserSettings;





