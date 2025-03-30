
import React, { useState } from "react";

import { obtenerCiudadPorCoordenadas } from "../../services/WeatherService";
import { obtenerDatosClimaticos } from "../../services/WeatherService";
import InputFieldWithHint from "../common/inputField/InputFieldWithHint";
import InputWithButton from "../common/inputField/InputWithButton";


const SimulationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    location: "",
    energyType: "solar",
    projectSize: "",
    budget: "",
    energyConsumption: "",
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
    if (!formData.energyConsumption || isNaN(formData.energyConsumption) ||
      formData.energyConsumption < 50 || formData.energyConsumption > 100000) {
      newErrors.energyConsumption = "Debe estar entre 50 y 100000 kWh/mes.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const climate = await obtenerDatosClimaticos(formData.location);
      console.log("📊 Datos climáticos:", climate);

      const climaNormalizado = {
        irradiance: climate.irradianciaEstimativa,
        wind: climate.viento,
        hydrology: 3.0, // valor arbitrario para la simulación hidroeléctrica
      };

      console.log("✅ Enviando clima normalizado:", climaNormalizado);

      onSubmit({ ...formData, climate: climaNormalizado });
    } catch (error) {
      console.error("Error al obtener datos climáticos:", error);
      alert("Hubo un problema al obtener los datos climáticos.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Ubicación */}
      <InputWithButton
        label="Ubicación"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Ej. Gijón"
        error={errors.location}
        buttonLabel={loadingLocation ? "..." : "📍"}
        onButtonClick={handleUseMyLocation}
        disabled={loadingLocation}
        title="Usar mi ubicación actual"
      />
      {/* Tipo de energía */}
      <InputFieldWithHint
        label="Tipo de energía"
        name="energyType"
        type="select"
        value={formData.energyType}
        onChange={handleChange}
        options={[
          { value: "solar", label: "Solar ☀️" },
          { value: "wind", label: "Eólica 💨" },
          { value: "hydro", label: "Hidroeléctrica 💧" },
        ]}
        title="Selecciona la fuente de energía renovable."
      />

      {/* Tamaño del proyecto */}
      <InputFieldWithHint
        label="Tamaño del proyecto (kW)"
        name="projectSize"
        type="number"
        value={formData.projectSize}
        onChange={handleChange}
        placeholder="Ej. 150"
        error={errors.projectSize}
        hint="Debe estar entre 1 y 500 kW."
        title="Ingresa la capacidad total estimada del sistema (en kilovatios)."
        icon="🔧"
      />

      {/* Consumo energético */}
      <InputFieldWithHint
        label="Consumo energético mensual (kWh)"
        name="energyConsumption"
        type="number"
        value={formData.energyConsumption}
        onChange={handleChange}
        placeholder="Ej. 800"
        error={errors.energyConsumption}
        hint="Rango aceptado: 50 – 100000 kWh/mes."
        title="Introduce tu consumo mensual estimado en kilovatios-hora."
        icon="⚡"
      />

      {/* Presupuesto */}
      <InputFieldWithHint
        label="Presupuesto estimado (€)"
        name="budget"
        type="number"
        value={formData.budget}
        onChange={handleChange}
        placeholder="Ej. 5000"
        error={errors.budget}
        icon="💶"
        title="Ingresa el presupuesto disponible para tu instalación."
      />
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