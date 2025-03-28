
// src/services/ClimaService.js
import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const obtenerDatosClimaticos = async (ciudad) => {
  const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
    params: {
      q: ciudad,
      appid: API_KEY,
      units: "metric",
    },
  });

  const { temp, humidity } = response.data.main;
  const windSpeed = response.data.wind.speed;
  const irradiancia = response.data.clouds.all; // Aproximado

  return {
    temperatura: temp,
    humedad: humidity,
    viento: windSpeed,
    irradianciaEstimativa: 1000 * (1 - irradiancia / 100), // Aprox en W/m²
  };
};


