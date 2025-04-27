import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faLeaf, faProjectDiagram } from "@fortawesome/free-solid-svg-icons";

const stats = [
  { icon: faHome, number: "500+", text: "Hogares han reducido su huella de carbono" },
  { icon: faLeaf, number: "1M+", text: "Toneladas de CO₂ evitadas" },
  { icon: faProjectDiagram, number: "300+", text: "Proyectos sostenibles completados" },
];

const StatisticsSection = () => {
  return (
    <section className="py-12 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 drop-shadow-md">
        Impacto de nuestras soluciones
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
        {stats.map((stat, index) => (
          <motion.div 
            key={index} 
            className="bg-white bg-opacity-90 border border-gray-200 rounded-xl shadow-lg p-6 text-center transition-all transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <FontAwesomeIcon icon={stat.icon} className="text-4xl text-green-600 mb-4" />
            <h3 className="text-3xl font-bold text-green-700">{stat.number}</h3>
            <p className="text-lg text-green-600">{stat.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatisticsSection;
