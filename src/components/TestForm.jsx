import React, { useState } from "react";
import apiService from "../services/apiService.jsx";

const TestForm = ({ onTestAdded }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.createTest(message); // ✅ Enviar el mensaje correctamente
      setMessage("");
      onTestAdded(); // ✅ Llamamos a la función para actualizar la lista
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h3>Add Test Data</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message"
          required
        />
        <button type="submit">Add Test</button>
      </form>
    </div>
  );
};

export default TestForm;


