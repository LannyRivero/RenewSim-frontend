import React, { useEffect, useState } from "react";
import TechnologyService from "@/services/TechnologyService";
import { toast } from "react-toastify";

const TechnologyEditForm = ({ technologyId, onClose, onSaved }) => {
  const [formData, setFormData] = useState({
    technologyName: "",
    energyType: "",
    efficiency: "",
    installationCost: "",
    co2Reduction: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchTechnology = async () => {
      try {
        const data = await TechnologyService.getTechnologyById(technologyId);
        setFormData(data);
      } catch (error) {
        console.error("Error al cargar la tecnología:", error);
        toast.error("❌ No se pudo cargar la tecnología.");
      } finally {
        setLoading(false);
      }
    };

    if (technologyId) {
      fetchTechnology();
    }
  }, [technologyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await TechnologyService.updateTechnology(technologyId, formData);
      toast.success("✅ Tecnología actualizada correctamente");
      onSaved(); // actualiza lista y cierra modal
    } catch (error) {
      console.error("Error al actualizar la tecnología", error);
      const backendMessage = error.response?.data?.message || error.message;
      toast.error(`❌ No se pudo guardar la tecnología: ${backendMessage}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center text-gray-600">Cargando tecnología...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          name="technologyName"
          value={formData.technologyName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tipo de energía</label>
        <input
          type="text"
          name="energyType"
          value={formData.energyType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Eficiencia (%)</label>
        <input
          type="number"
          name="efficiency"
          value={formData.efficiency}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          min="0"
          step="0.01"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Coste instalación (€)</label>
        <input
          type="number"
          name="installationCost"
          value={formData.installationCost}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          min="0"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Reducción de CO₂ (kg)</label>
        <input
          type="number"
          name="co2Reduction"
          value={formData.co2Reduction}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          min="0"
          required
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded hover:bg-gray-100 text-gray-700"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {submitting ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
};

export default TechnologyEditForm;
// 







