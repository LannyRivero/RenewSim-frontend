import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Resources = () => {
  const [daysLeft, setDaysLeft] = useState(null);

  const targetDate = new Date("2025-07-01");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;
      const days = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
      setDaysLeft(days);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center text-center px-4">
      <motion.div
        className="max-w-xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/565/565547.png"
          alt="En construcción"
          className="w-32 mx-auto mb-6 opacity-80"
        />

        <h1 className="text-3xl sm:text-4xl font-bold text-green-700 mb-4">
          Página en construcción
        </h1>

        <p className="text-gray-600 text-lg mb-6">
          Estamos preparando una colección de recursos útiles para ayudarte a implementar energías
          renovables. ¡Muy pronto estará disponible!
        </p>

        {daysLeft !== null && (
          <p className="text-sm text-gray-500 mb-8">
            Disponible en aproximadamente <strong>{daysLeft} días</strong> 🚀
          </p>
        )}

        <a
          href="/"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition"
        >
          Volver al inicio
        </a>
      </motion.div>
    </div>
  );
};

export default Resources;

