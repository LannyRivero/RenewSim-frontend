import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { obtenerCiudadPorCoordenadas, obtenerDatosClimaticos, buscarUbicaciones } from "@/services/WeatherService";
import InputFieldWithHint from "../common/inputField/InputFieldWithHint";
import InputWithButton from "../common/inputField/InputWithButton";
import ErrorToast from "../common/ErrorToast";
import PrimaryButton from "@/components/common/button/PrimaryButton";

// ...

<div className="text-center pt-4">
  <PrimaryButton type="submit" disabled={isSubmitting}>
    {isSubmitting ? "Simulando..." : "Simular"}
  </PrimaryButton>
</div>


const SimulationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    location: "",
    energyType: "solar",
    projectSize: "",
    budget: "",
    energyConsumption: "",
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
    if (!formData.projectSize || isNaN(formData.projectSize)) newErrors.projectSize = "Introduce un tamaño válido.";
    if (!formData.budget || isNaN(formData.budget)) newErrors.budget = "Introduce un presupuesto válido.";
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
      console.log("📊 Datos climáticos:", climate);

      const climaNormalizado = {
        irradiance: Math.max(climate.irradianciaEstimativa, 50),
        wind: climate.viento,
        hydrology: 3.0,
      };

      await onSubmit({
        ...formData,
        climate: climaNormalizado,
        date: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(
        error.response?.data?.message ||
        "Ocurrió un error inesperado al simular."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
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

      {/* Sugerencias animadas */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.ul
            className="absolute z-20 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-md max-h-48 overflow-y-auto mt-1 w-full text-sm"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {suggestions.map((s, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition-all"
                onClick={() => {
                  setFormData({ ...formData, location: s.display_name });
                  setSuggestions([]);
                  setShowSuggestions(false);
                }}
              >
                {s.country_code && (
                  <img
                    src={`https://flagcdn.com/w20/${s.country_code}.png`}
                    alt={s.country_code}
                    className="w-5 h-3 rounded-sm object-cover"
                  />
                )}
                <span>{s.display_name}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

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
        title="Ingresa la capacidad total estimada del sistema."
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
        title="Introduce tu consumo mensual estimado."
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
        title="Ingresa el presupuesto disponible."
      />

      {/* Botón animado */}
      <div className="text-center pt-4">
        <PrimaryButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Simulando..." : "Simular"}
        </PrimaryButton>
      </div>

      {/* Error animado */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <ErrorToast message={errorMessage} onClose={() => setErrorMessage("")} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
};

export default SimulationForm;


