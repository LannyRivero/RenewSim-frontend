// Servicio para consultar la API de OpenWeatherMap y obtener datos climáticos
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
  const irradiancia = response.data.clouds.all; // Porcentaje de nubes

  return {
    temperatura: temp,
    humedad: humidity,
    viento: windSpeed, // m/s
    irradianciaEstimativa: 1000 * (1 - irradiancia / 100), // W/m² estimado
  };
};

export const obtenerCiudadPorCoordenadas = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
  );

  const data = await response.json();
  return data[0]?.name || "Ciudad desconocida";
};

export const buscarUbicaciones = async (query) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Error al buscar ubicaciones.");
  }

  return await response.json(); 
};

