import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const IntroSection = () => {
  const navigate = useNavigate();

  const handleStartSimulation = () => {
    navigate("/configuration");
  };

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-green-700 via-green-600 to-green-500 text-white px-6 py-12">
      {/* Contenedor Principal */}
      <motion.div 
        className="max-w-4xl bg-white bg-opacity-20 p-10 rounded-lg shadow-xl backdrop-blur-md border border-white/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-md">
          Simulador de Energías Renovables ⚡
        </h1>
        <p className="text-lg md:text-xl opacity-90 mb-8">
          Descubre cómo optimizar el uso de energías renovables en tu hogar o negocio. 
          Analiza costos, beneficios y el impacto ambiental de tus decisiones energéticas.
        </p>

        {/* Botones */}
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <button 
            onClick={handleStartSimulation}
            className="bg-white text-green-700 font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105 hover:bg-gray-100 shadow-lg"
          >
            Comenzar Simulación
          </button>
          <button 
            className="border-2 border-white text-white py-3 px-8 rounded-lg hover:bg-white hover:text-green-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Más información
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default IntroSection;

