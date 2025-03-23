import React from "react";
import { useNavigate } from "react-router-dom";
import IntroSection from "../section/IntroSection";
import StatisticsSection from "../section/StatisticsSection";
import TestimonialsPage from "./TestimonialsPage";

// Importa la imagen correctamente si está en `src/assets/`
import bgImage from "../../assets/generacion-eolica.jpg"; 

const Home = () => {
  return (
    <div 
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }} // Asegura que la imagen se carga correctamente
    >
      {/* Superposición para oscurecer el fondo */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Contenido Principal */}
      <main className="relative z-10 flex flex-col items-center justify-center text-white text-center pt-14">

        {/* Sección de Introducción */}
        <IntroSection />

        {/* Sección de estadísticas */}
        <section className="mt-4 w-full max-w-6xl px-6">
          <StatisticsSection />
          <TestimonialsPage />

        </section>
      </main>
    </div>
  );
};

export default Home;















