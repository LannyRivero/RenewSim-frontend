import TestComponent from "../components/TestComponent";

import { useEffect, useState } from "react";
import { testBackendConnection } from "../services/api";
import "../styles/home.css";

export default function Home() {
  const [backendMessage, setBackendMessage] = useState("Conectando...");

  useEffect(() => {
    const fetchData = async () => {
      const message = await testBackendConnection();
      setBackendMessage(message);
    };
    fetchData();
  }, []);

  return (
    <div className="home-container">
      <h1>🌱 Bienvenido a RenewSim</h1>
      <p>Simulador de Energías Renovables</p>
      <p><strong>Estado del Backend:</strong> {backendMessage}</p>
    </div>
  );
}
