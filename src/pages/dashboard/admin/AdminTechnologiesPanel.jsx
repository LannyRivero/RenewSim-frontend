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

  const [errors, setErrors] = useState({});

  const validateForm = (name, value) => {
    const newErrors = { ...errors };

    if (name === "installationCost") {
      const cost = parseFloat(value);
      if (isNaN(cost) || cost < 500 || cost > 30000) {
        newErrors.installationCost = "El coste debe estar entre 500 € y 30 000 €.";
      } else {
        delete newErrors.installationCost;
      }
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validateForm(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      toast.error("❌ Corrige los errores antes de enviar.");
      return;
    }

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
          { name: 'installationCost', label: 'Coste de Instalación Estimado para 10 kW (€)' },
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
              className={`mt-1 block w-full border rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors[name] ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {name === "installationCost" && (
              <>
                <p className="text-xs text-gray-500 dark:text-gray-400 italic mt-1">
                  * Estimado según un sistema estándar de 10 kW.
                </p>
                {errors.installationCost && (
                  <p className="text-xs text-red-500 mt-1">{errors.installationCost}</p>
                )}
              </>
            )}
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

        <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-2">
          * Los valores de coste de instalación deben ser aproximados para sistemas de 10 kW, basados en datos de referencia como IRENA, IEA o Eurostat.
        </p>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
          disabled={Object.keys(errors).length > 0}
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



