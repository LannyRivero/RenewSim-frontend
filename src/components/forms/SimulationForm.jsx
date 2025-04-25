import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  obtenerCiudadPorCoordenadas,
  obtenerDatosClimaticos,
  buscarUbicaciones,
} from "@/services/WeatherService";
import InputWithButton from "../common/inputField/InputWithButton";
import InputFieldWithHint from "../common/inputField/InputFieldWithHint";
import ErrorToast from "../common/ErrorToast";
import PrimaryButton from "@/components/common/button/PrimaryButton";
import { estimateProjectSize, estimateBudget } from "@/utils/estimationUtils";

const SimulationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    location: "",
    energyConsumption: "",
    energyType: "solar",
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "location" && value.length >= 3) {
      try {
        const results = await buscarUbicaciones(value);
        setSuggestions(results.slice(0, 5));
        setShowSuggestions(true);
      } catch (err) {
        console.error("Error al buscar ubicaciones:", err);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else if (name === "location") {
      setSuggestions([]);
      setShowSuggestions(false);
    }
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
          setFormData((prev) => ({ ...prev, location: ciudad }));
        } catch (error) {
          alert("No se pudo obtener tu ubicación.");
        } finally {
          setLoadingLocation(false);
        }
      },
      (error) => {
        alert("No se pudo obtener tu ubicación.");
        setLoadingLocation(false);
      }
    );
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.location.trim()) newErrors.location = "La ubicación es obligatoria.";
    if (
      !formData.energyConsumption ||
      isNaN(formData.energyConsumption) ||
      formData.energyConsumption < 50 ||
      formData.energyConsumption > 100000
    ) {
      newErrors.energyConsumption = "Debe estar entre 50 y 100000 kWh/mes.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const climate = await obtenerDatosClimaticos(formData.location);
      const climateData = {
        irradiance: Math.max(climate.irradianciaEstimativa, 50),
        wind: climate.viento,
        hydrology: 3.0,
      };

      const projectSize = estimateProjectSize(parseFloat(formData.energyConsumption));
      const budget = estimateBudget(projectSize, formData.energyType);


      await onSubmit({
        ...formData,
        projectSize,
        budget,
        climate: climateData,
        date: new Date().toISOString(),
      });
    } catch (error) {
      setErrorMessage("Ocurrió un error inesperado al simular.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form onSubmit={handleSubmit} className="space-y-6 relative">
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

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.ul className="absolute z-20 bg-white border rounded-md shadow-md max-h-48 overflow-y-auto mt-1 w-full text-sm">
            {suggestions.map((s, idx) => (
              <li
                key={idx}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                onClick={() => {
                  setFormData({ ...formData, location: s.display_name });
                  setSuggestions([]);
                  setShowSuggestions(false);
                }}
              >
                {s.display_name}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <InputFieldWithHint
        label="Consumo energético mensual (kWh)"
        name="energyConsumption"
        type="number"
        value={formData.energyConsumption}
        onChange={handleChange}
        placeholder="Ej. 800"
        error={errors.energyConsumption}
        hint="Rango aceptado: 50 – 100000 kWh/mes."
        title="Introduce tu consumo mensual estimado."
        icon="⚡"
      />
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

      <div className="text-center pt-4">
        <PrimaryButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Simulando..." : "Simular"}
        </PrimaryButton>
      </div>

      <AnimatePresence>
        {errorMessage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ErrorToast message={errorMessage} onClose={() => setErrorMessage("")} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
};

export default SimulationForm;



