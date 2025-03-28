import React, { useState, useEffect } from "react";
//import apiService from "../services/apiService"; 



const TestPage = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService.getTests();
        console.log("Received data in TestPage:", data);
        setTests(Array.isArray(data) ? data : []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-gray-600 text-center">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Test Data</h2>

      {error ? (
        <div className="bg-red-100 text-red-700 p-3 rounded-md border border-red-500 text-center">
          {error}
        </div>
      ) : tests.length > 0 ? (
        <ul className="list-disc pl-5">
          {tests.map((test) => (
            <li key={test.id} className="text-gray-700 text-lg">
              {test.message}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">No data available</p>
      )}
    </div>
  );
};

export default TestPage;
