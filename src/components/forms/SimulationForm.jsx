import React, { useState } from 'react';

const SimulationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    location: '',
    projectSize: '',
    cost: '',
    energySource: 'solar',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Simulación Personalizada</h2>

      <div className="mb-4">
        <label htmlFor="location" className="block text-gray-700 font-bold mb-2">
          Ubicación
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="projectSize" className="block text-gray-700 font-bold mb-2">
          Tamaño del Proyecto (kW)
        </label>
        <input
          type="number"
          id="projectSize"
          name="projectSize"
          value={formData.projectSize}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="cost" className="block text-gray-700 font-bold mb-2">
          Costo (€)
        </label>
        <input
          type="number"
          id="cost"
          name="cost"
          value={formData.cost}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="energySource" className="block text-gray-700 font-bold mb-2">
          Fuente de Energía
        </label>
        <select
          id="energySource"
          name="energySource"
          value={formData.energySource}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        >
          <option value="solar">Solar</option>
          <option value="wind">Eólica</option>
          <option value="hydro">Hidroeléctrica</option>
        </select>
      </div>

      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:scale-105 text-white font-bold py-2 px-6 rounded-lg transition-transform duration-200"
        >
          Iniciar Simulación
        </button>
      </div>
    </form>
  );
};

export default SimulationForm;
