import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const IntroSection = () => {
  const navigate = useNavigate();

  const handleStartSimulation = () => {
    const mainContent = document.querySelector(".home-main");
    mainContent?.classList.add("fade-out");
    setTimeout(() => {
      navigate("/configuration");
    }, 500);
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-3xl bg-black/60 p-6 md:p-8 rounded-lg shadow-2xl backdrop-blur-md"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-3xl md:text-5xl font-bold text-white drop-shadow-md"
        >
          Simulador de Energías Renovables ⚡
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-4 text-base md:text-lg text-gray-200 leading-relaxed"
        >
          Descubre cómo puedes optimizar el uso de energías renovables en tu hogar o negocio.
          Analiza costos, beneficios y el impacto ambiental de tus decisiones energéticas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-6 flex flex-col md:flex-row justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartSimulation}
            className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-green-400 transition-all"
          >
            Comenzar Simulación
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-green-500 text-green-500 py-3 px-6 rounded-lg hover:bg-green-500 hover:text-white transition-all shadow-lg"
          >
            Más información
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default IntroSection;

