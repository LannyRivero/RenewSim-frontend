import React, { useEffect, useState } from "react";
import TechnologyService from "@/services/TechnologyService";
import { toast } from "react-toastify";

const TechnologyEditForm = ({ technologyId, onClose, onSaved }) => {
  const [formData, setFormData] = useState({
    technologyName: "",
    energyType: "",
    efficiency: "",
    installationCost: "",
    co2Reduction: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (technologyId) {
      TechnologyService.getTechnologyById(technologyId)
        .then((data) => setFormData(data))
        .catch((error) => {
          console.error("Error al cargar la tecnología", error);
          toast.error("Error al cargar los datos de la tecnología.");
        });
    }
  }, [technologyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await TechnologyService.updateTechnology(technologyId, formData);
      toast.success("Tecnología actualizada correctamente");
      onSaved(); 
    } catch (error) {
      console.error("Error al actualizar la tecnología", error);
      toast.error("No se pudo guardar la tecnología.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <h2 className="text-lg font-semibold">Editar Tecnología</h2>

      <div>
        <label className="block text-sm font-medium">Nombre</label>
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
        <label className="block text-sm font-medium">Tipo de energía</label>
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
        <label className="block text-sm font-medium">Eficiencia (%)</label>
        <input
          type="number"
          name="efficiency"
          value={formData.efficiency}
          onChange={handleChange}
          step="0.01"
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Coste instalación (€)</label>
        <input
          type="number"
          name="installationCost"
          value={formData.installationCost}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Reducción de CO₂ (kg)</label>
        <input
          type="number"
          name="co2Reduction"
          value={formData.co2Reduction}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
};

export default TechnologyEditForm;
