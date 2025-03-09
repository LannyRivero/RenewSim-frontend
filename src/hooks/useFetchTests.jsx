import { useState, useEffect } from "react";
import { fetchTests } from "../services/apiService"; // ✅ Importación correcta



const useFetchTests = (refresh) => {
  const [tests, setTests] = useState([]); // ✅ Inicializar como array vacío
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTests();
        console.log("API Response:", data); // ✅ Ver la estructura en la consola
        setTests(Array.isArray(data) ? data : []); // ✅ Asegurar que `tests` siempre sea un array
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refresh]); // ✅ Se ejecuta cuando `refresh` cambia

  return { tests, loading, error };
};

export default useFetchTests;
