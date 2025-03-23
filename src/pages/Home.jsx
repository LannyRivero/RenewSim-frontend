import React from "react";
import { useNavigate } from "react-router-dom";
import IntroSection from "../components/section/IntroSection";
import StatisticsSection from "../components/section/StatisticsSection";
import TestimonialsPage from "../pages/TestimonialsPage";

// Usa una ruta relativa si `@` no funciona
import bgImage from "../assets/generacion-eolica.jpg"; 

const Home = () => {
  return (
    <div 
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Superposición oscura para mejorar contraste */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Contenido Principal */}
      <main className="relative z-10 flex flex-col items-center justify-center text-white text-center pt-14 gap-10">

        {/* Sección de Introducción */}
        <IntroSection />

        {/* Sección de estadísticas y testimonios */}
        <section className="mt-4 w-full max-w-6xl px-6">
          <StatisticsSection />
          <TestimonialsPage />
        </section>

        {/* Botones bien alineados */}
        <div className="flex gap-4 mt-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">Comenzar Simulación</button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">Más información</button>
        </div>

      </main>
    </div>
  );
};

export default Home;

















