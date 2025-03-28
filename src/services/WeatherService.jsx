
import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const obtenerCiudadPorCoordenadas = async (lat, lon) => {
  const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: "metric",
    },
  });

  return response.data.name;
};

