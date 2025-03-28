
import React, { useState } from "react";
import { obtenerCiudadPorCoordenadas } from "../../services/WeatherService";

import { obtenerDatosClimaticos } from "../../services/WeatherService";

const SimulationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    location: "",
    energyType: "solar",
    projectSize: "",
    budget: "",
  });

  const [errors, setErrors] = useState({});
  const [loadingLocation, setLoadingLocation] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUseMyLocation = async () => {
    if (!navigator.geolocation) {
      alert("La geolocalización no está disponible en este navegador.");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const ciudad = await obtenerCiudadPorCoordenadas(latitude, longitude);
          setFormData((prev) => ({
            ...prev,
            location: ciudad,
          }));
        } catch (error) {
          alert("No se pudo obtener tu ubicación.");
          console.error(error);
        } finally {
          setLoadingLocation(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error.message);
        alert("No se pudo obtener tu ubicación.");
        setLoadingLocation(false);
      }
    );
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.location.trim()) newErrors.location = "La ubicación es obligatoria.";
    if (!formData.projectSize || isNaN(formData.projectSize))
      newErrors.projectSize = "Introduce un tamaño válido.";
    if (!formData.budget || isNaN(formData.budget))
      newErrors.budget = "Introduce un presupuesto válido.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const clima = await obtenerDatosClimaticos(formData.location);
      console.log("📊 Datos climáticos:", clima);

      onSubmit({ ...formData, clima });
    } catch (error) {
      console.error("Error al obtener datos climáticos:", error);
      alert("Hubo un problema al obtener los datos climáticos.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Ubicación */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-700 font-medium">Ubicación</label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Ej. Gijón"
            className={`flex-1 px-4 py-2 border rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.location ? "border-red-500" : "border-gray-300"
            }`}
          />
          <button
            type="button"
            onClick={handleUseMyLocation}
            disabled={loadingLocation}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm shadow-md transition"
            title="Usar mi ubicación"
          >
            {loadingLocation ? "..." : "📍"}
          </button>
        </div>
        {errors.location && (
          <p className="text-sm text-red-500 mt-1">{errors.location}</p>
        )}
      </div>

      {/* Tipo de energía */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-700 font-medium">Tipo de energía</label>
        <select
          name="energyType"
          value={formData.energyType}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="solar">Solar</option>
          <option value="wind">Eólica</option>
          <option value="hydro">Hidroeléctrica</option>
        </select>
      </div>

      {/* Tamaño del proyecto */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-700 font-medium">Tamaño del proyecto (kW)</label>
        <input
          type="number"
          name="projectSize"
          value={formData.projectSize}
          onChange={handleChange}
          placeholder="Ej. 150"
          className={`px-4 py-2 border rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.projectSize ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.projectSize && (
          <p className="text-sm text-red-500 mt-1">{errors.projectSize}</p>
        )}
      </div>

      {/* Presupuesto */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-700 font-medium">Presupuesto estimado (€)</label>
        <input
          type="number"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          placeholder="Ej. 5000"
          className={`px-4 py-2 border rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.budget ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.budget && (
          <p className="text-sm text-red-500 mt-1">{errors.budget}</p>
        )}
      </div>

      {/* Botón */}
      <div className="text-center pt-4">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg text-sm transition-all shadow-md"
        >
          Simular
        </button>
      </div>
    </form>
  );
};

export default SimulationForm;