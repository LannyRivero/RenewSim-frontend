import { useState, useEffect } from "react";
import { fetchTests } from "../services/apiService"; // ✅ Importación correcta

const useFetchTests = (refresh) => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTests(); // ✅ Llamamos correctamente a la función
        setTests(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refresh]); // ✅ Ahora se actualiza cuando `refresh` cambia

  return { tests, loading, error };
};

export default useFetchTests;


