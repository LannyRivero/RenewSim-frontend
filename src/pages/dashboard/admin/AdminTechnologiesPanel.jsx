
import React, { useState } from 'react';
import TechnologyService from '@/services/TechnologyService';
import { toast } from 'react-toastify';

const AdminTechnologiesPanel = () => {
  const [form, setForm] = useState({
    technologyName: '',
    co2Reduction: '',
    energyProduction: '',
    installationCost: '',
    efficiency: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await TechnologyService.createTechnology(form);
      toast.success("✅ Tecnología registrada correctamente");
      setForm({ technologyName: '', co2Reduction: '', energyProduction: '', installationCost: '', efficiency: '' });
    } catch (err) {
      toast.error("❌ Error al registrar tecnología");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Crear Nueva Tecnología</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['technologyName', 'co2Reduction', 'energyProduction', 'installationCost', 'efficiency'].map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {field}
            </label>
            <input
              type="text"
              name={field}
              id={field}
              value={form[field]}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Crear Tecnología
        </button>
      </form>
    </div>
  );
};

export default AdminTechnologiesPanel;
