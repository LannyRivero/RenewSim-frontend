import React from "react";
import IntroSection from "../components/IntroSection";

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


    </div>
  );
};

export default Home;



