import React from "react";
import { useNavigate } from "react-router-dom";
import IntroSection from "../components/IntroSection";
import FeatureCard from "../components/FeatureCard";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-600 to-green-500 text-white">
      {/* Intro Section */}
      <IntroSection />

      {/* Hero Section */}
      <header className="text-center px-6 mt-12">
        <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
          Simulador de Energías Renovables ⚡
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl">
          Explora, analiza y optimiza fuentes de energía renovable de forma interactiva y precisa.
        </p>
        <div className="mt-6 space-x-4">
          <button
            onClick={() => navigate("/configuration")}
            className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg shadow-md hover:bg-yellow-300 transition"
          >
            Iniciar Simulación
          </button>
          <button className="px-6 py-3 border-2 border-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition">
            Explorar Opciones
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="mt-16 grid md:grid-cols-3 gap-8 px-6 max-w-6xl">
        <FeatureCard 
          icon="☀️" 
          title="Energía Solar" 
          description="Calcula el rendimiento de paneles solares en distintas ubicaciones." 
        />
        <FeatureCard 
          icon="💨" 
          title="Energía Eólica" 
          description="Simula la eficiencia de turbinas eólicas en diversas regiones." 
        />
        <FeatureCard 
          icon="💧" 
          title="Energía Hidroeléctrica" 
          description="Evalúa la viabilidad de proyectos hidroeléctricos." 
        />
      </section>

      {/* Footer */}
      <footer className="mt-16 text-center text-sm opacity-75">
        © {new Date().getFullYear()} RenewSim. Energías Renovables para un Futuro Sostenible.
      </footer>
    </div>
  );
};

export default Home;
