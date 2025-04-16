import React from "react";
import { motion } from "framer-motion";

const About = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const benefits = [
    {
      icon: "💡",
      title: "Simulación Inteligente",
      desc: "El sistema analiza tu consumo y te sugiere soluciones personalizadas basadas en tus datos.",
    },
    {
      icon: "🌍",
      title: "Impacto Ambiental",
      desc: "Calculamos la reducción estimada de CO₂ y otros beneficios ambientales con cada simulación.",
    },
    {
      icon: "📊",
      title: "Resultados Claros",
      desc: "Obtén reportes detallados con datos sobre inversión, retorno y eficiencia energética.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-green-700 text-center mt-12 mb-6">
          Acerca del Simulador de Energías Renovables
        </h1>

        <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">
          Esta plataforma te permite analizar, comparar y optimizar el uso de energías limpias como
          la solar, eólica e hidroeléctrica. Ya seas un particular, empresa o institución, puedes
          tomar decisiones más informadas sobre tu futuro energético.
        </p>

        {/* Beneficios con animación */}
        <div className="grid gap-8 md:grid-cols-3 mb-16">
          {benefits.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition text-center sm:text-left"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-2 flex justify-center sm:justify-start items-center gap-2">
                <span className="text-3xl">{item.icon}</span>
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Tecnologías */}
        <motion.div
          className="bg-green-50 p-8 rounded-xl shadow-inner text-center"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={benefits.length}
        >
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            ¿Qué tecnologías se incluyen?
          </h2>
          <ul className="list-disc list-inside text-left max-w-md mx-auto text-gray-700 space-y-2">
            <li>Paneles solares fotovoltaicos</li>
            <li>Turbinas eólicas de eje horizontal</li>
            <li>Microcentrales hidroeléctricas</li>
            <li>(Próximamente: Biomasa y geotermia)</li>
          </ul>
        </motion.div>

        {/* Botón volver */}
        <motion.div
          className="mt-12 text-center"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={benefits.length + 1}
        >
          <a
            href={isLoggedIn ? "/dashboard/simulation" : "/"}
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Volver al inicio
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default About;


