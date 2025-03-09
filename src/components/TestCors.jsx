import React, { useState } from "react";

const TestCors = () => {
  const [message, setMessage] = useState("");

  const testCorsRequest = () => {
    fetch("http://localhost:8080/api/v1/test")
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error("Error:", error));
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-lg font-bold">Test CORS Configuration</h2>
      <button
        onClick={testCorsRequest}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Test CORS
      </button>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default TestCors;
