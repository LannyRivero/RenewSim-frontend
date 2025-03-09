import React, { useState } from "react";
import useFetchTests from "../hooks/useFetchTests";
import TestForm from "./TestForm";

const TestList = () => {
  const [refresh, setRefresh] = useState(false);
  const { tests, loading, error } = useFetchTests(refresh); // ✅ Pasamos `refresh` como prop

  // ✅ Esta función se ejecutará cada vez que un test sea agregado
  const handleTestAdded = () => {
    setRefresh((prev) => !prev); // 🔄 Forzar actualización de `useFetchTests`
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Test Data</h2>
      <TestForm onTestAdded={handleTestAdded} />
      <ul>
        {tests.map((test) => (
          <li key={test.id}>{test.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default TestList;


