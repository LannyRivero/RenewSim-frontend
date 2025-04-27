import { useState, useEffect } from "react";
import { fetchTests } from "@/services/apiService"; 



const useFetchTests = (refresh) => {
  const [tests, setTests] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTests();
        console.log("API Response:", data); 
        setTests(Array.isArray(data) ? data : []); 
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refresh]); 

  return { tests, loading, error };
};

export default useFetchTests;
