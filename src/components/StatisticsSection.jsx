import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faLeaf, faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const StatisticsSection = () => {
  const stats = [
    { icon: faHome, number: "500+", text: "Hogares han reducido su huella de carbono" },
    { icon: faLeaf, number: "1M+", text: "Toneladas de CO₂ evitadas" },
    { icon: faProjectDiagram, number: "300+", text: "Proyectos sostenibles completados" },
  ];

  return (
    <section className="w-full py-12 bg-gradient-to-b from-green-800 to-green-600 text-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">Impacto de nuestras soluciones</h2>

      <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            className="bg-white text-gray-900 p-6 rounded-xl shadow-lg w-72 flex flex-col items-center hover:shadow-2xl transition-all transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <FontAwesomeIcon icon={stat.icon} className="text-green-600 text-5xl mb-4 transition-transform duration-300 hover:rotate-6" />
            <h3 className="text-3xl font-bold text-green-700">{stat.number}</h3>
            <p className="mt-2 text-gray-700">{stat.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatisticsSection;
