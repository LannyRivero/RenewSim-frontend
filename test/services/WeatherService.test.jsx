import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import {
  obtenerDatosClimaticos,
  obtenerCiudadPorCoordenadas,
  buscarUbicaciones,
} from "@/services/WeatherService";

vi.mock("axios");
vi.stubGlobal("fetch", vi.fn());

describe("ClimaService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("obtenerDatosClimaticos", () => {
    it("debe retornar los datos climáticos procesados", async () => {
      axios.get.mockResolvedValue({
        data: {
          main: { temp: 20, humidity: 50 },
          wind: { speed: 5 },
          clouds: { all: 20 },
        },
      });

      const resultado = await obtenerDatosClimaticos("Madrid");
      expect(resultado).toEqual({
        temperatura: 20,
        humedad: 50,
        viento: 5,
        irradianciaEstimativa: 800,
      });
    });
  });

  describe("obtenerCiudadPorCoordenadas", () => {
    it("debe devolver el nombre de la ciudad", async () => {
      fetch.mockResolvedValueOnce({
        json: () =>
          Promise.resolve([
            {
              name: "Barcelona",
            },
          ]),
      });

      const ciudad = await obtenerCiudadPorCoordenadas(41.3851, 2.1734);
      expect(ciudad).toBe("Barcelona");
    });

    it("devuelve 'Ciudad desconocida' si no se encuentra nombre", async () => {
      fetch.mockResolvedValueOnce({
        json: () => Promise.resolve([]),
      });

      const ciudad = await obtenerCiudadPorCoordenadas(0, 0);
      expect(ciudad).toBe("Ciudad desconocida");
    });
  });

  describe("buscarUbicaciones", () => {
    it("debe retornar los resultados de búsqueda", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve([
            { display_name: "Gijón, Asturias" },
            { display_name: "Gijón, Spain" },
          ]),
      });

      const resultados = await buscarUbicaciones("Gijón");
      expect(resultados).toHaveLength(2);
    });

    it("lanza error si la respuesta no es OK", async () => {
      fetch.mockResolvedValueOnce({ ok: false });

      await expect(buscarUbicaciones("error")).rejects.toThrow(
        "Error al buscar ubicaciones."
      );
    });
  });
});
