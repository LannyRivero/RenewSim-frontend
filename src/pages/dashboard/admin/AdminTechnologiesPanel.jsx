import React, { useState } from 'react';
import TechnologyService from '@/services/TechnologyService';
import AllTechnologiesList from "@/components/technologies/AllTechnologiesList";
import { toast } from 'react-toastify';

const AdminTechnologiesPanel = () => {
  const [form, setForm] = useState({
    technologyName: '',
    co2Reduction: '',
    energyProduction: '',
    installationCost: '',
    maintenanceCost: '',
    efficiency: '',
    environmentalImpact: '',
    energyType: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await TechnologyService.addTechnology(form);
      toast.success("✅ Tecnología registrada correctamente");
      setForm({
        technologyName: '',
        co2Reduction: '',
        energyProduction: '',
        installationCost: '',
        maintenanceCost: '',
        efficiency: '',
        environmentalImpact: '',
        energyType: '',
      });
    } catch (err) {
      toast.error("❌ Error al registrar tecnología");
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Crear Nueva Tecnología</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: 'technologyName', label: 'Nombre de la Tecnología' },
          { name: 'co2Reduction', label: 'Reducción de CO₂ (kg/año)' },
          { name: 'energyProduction', label: 'Producción Energética (kWh/año)' },
          { name: 'installationCost', label: 'Coste de Instalación (€)' },
          { name: 'maintenanceCost', label: 'Coste de Mantenimiento (€)' },
          { name: 'efficiency', label: 'Eficiencia (%)' },
          { name: 'environmentalImpact', label: 'Impacto Ambiental' },
        ].map(({ name, label }) => (
          <div key={name}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
            </label>
            <input
              type="text"
              name={name}
              id={name}
              value={form[name]}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        ))}

        {/* Energy Type Select */}
        <div>
          <label htmlFor="energyType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Tipo de Energía
          </label>
          <select
            name="energyType"
            id="energyType"
            value={form.energyType}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">-- Selecciona una opción --</option>
            {["Solar", "Eólica", "Hidroeléctrica", "Biomasa", "Geotérmica", "Oceánica"].map((type) => (
              <option key={type} value={type.toLowerCase()}>{type}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Crear Tecnología
        </button>
      </form>

      {/* Lista de tecnologías registradas */}
      <AllTechnologiesList />
    </div>
  );
};

export default AdminTechnologiesPanel;

