
import React, { useState } from "react";

import { obtenerCiudadPorCoordenadas } from "../../services/WeatherService";
import { obtenerDatosClimaticos } from "../../services/WeatherService";
import InputFieldWithHint from "../common/inputField/InputFieldWithHint";
import InputWithButton from "../common/inputField/InputWithButton";
import ErrorToast from "../common/ErrorToast";
import { buscarUbicaciones } from "../../services/WeatherService";




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
  const [consumptionUnit, setConsumptionUnit] = useState("kWh");


  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Si está escribiendo en el campo de ubicación
    if (name === "location") {
      if (value.length >= 3) {
        try {
          const results = await buscarUbicaciones(value);
          setSuggestions(results.slice(0, 5)); // mostrar hasta 5 sugerencias
          setShowSuggestions(true);
        } catch (err) {
          console.error("Error al buscar ubicaciones:", err);
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
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
      const consumoConvertido =  consumptionUnit === "MWh" ? formData.energyConsumption * 1000 : formData.energyConsumption;

      onSubmit({ ...formData, energyConsumption: consumoConvertido, climate: climaNormalizado });
    } catch (error) {
      console.error("Error al obtener datos climáticos o al simular:", error);

      let mensajeError = "Ocurrió un error inesperado al simular.";

      if (error.response?.data?.message) {
        mensajeError = error.response.data.message;
      } else if (error.request) {
        mensajeError = "No se pudo conectar con el servidor. Verifica tu conexión a internet.";
      } else if (error.message?.includes("timeout")) {
        mensajeError = "La solicitud tardó demasiado en responder. Intenta nuevamente más tarde.";
      }

      setErrorMessage(mensajeError);
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
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-md max-h-48 overflow-y-auto mt-1 w-full text-sm">
          {suggestions.map((s, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 px-4 py-2 hover:bg-blue-100 cursor-pointer"
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
        </ul>
      )}
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
      <div className="flex items-center gap-2">
        <InputFieldWithHint
          label="Consumo energético mensual"
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
        <select
          value={consumptionUnit}
          onChange={(e) => setConsumptionUnit(e.target.value)}
          className="mt-7 px-2 py-1 border rounded-md text-sm shadow-sm bg-white"
          title="Unidad de consumo"
        >
          <option value="kWh">kWh</option>
          <option value="MWh">MWh</option>
        </select>
      </div>


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
      {errorMessage && (
        <ErrorToast message={errorMessage} onClose={() => setErrorMessage("")} />
      )}

    </form>
  );
};

export default SimulationForm;