import React from "react";
import IntroSection from "../components/IntroSection";
import bgImage from "../assets/generacion-eolica.jpg"; // ✅ Importar la imagen correctamente

const Home = () => {
  return (
    <div 
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Capa de superposición para oscurecer la imagen */}
      <div className="absolute inset-0 bg-black/60 md:bg-black/50 lg:bg-black/40"></div>

      <main className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6 pt-20 md:pt-28">
        {/* Sección de Introducción */}
        <IntroSection />

        {/* Sección de estadísticas y testimonios (se puede descomentar cuando sea necesario) */}
        {/*
        <div className="flex flex-col md:flex-row justify-center gap-12 mt-12 w-full max-w-6xl px-4 lg:px-6">
          <StatisticsSection />
          <TestimonialsSection />
        </div>
        */}
      </main>
    </div>
  );
};

export default Home;



