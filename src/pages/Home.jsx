import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import bgImage from "../assets/generacion-eolica.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleSimulationClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard/user");
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40"></div>

      <main className="relative z-10 flex flex-col items-center text-white text-center px-4 py-16 gap-16">
        

        <motion.section
          className="w-full max-w-6xl mx-auto space-y-6"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Simulador de Energías Renovables
          </h1>
          <p className="text-lg md:text-xl">
            Analiza, compara y optimiza el uso de energías limpias en tu hogar, empresa o institución.
            Descubre el impacto ambiental y económico de tus decisiones.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            <button
              onClick={handleSimulationClick}
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded text-white font-semibold transition"
              aria-label="Comenzar simulación"
            >
              Comenzar Simulación
            </button>
            <a
              href="#impact"
              className="bg-white text-green-700 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition"
              aria-label="Más información"
            >
              Más información
            </a>
          </div>
        </motion.section>

        <motion.section
          id="impact"
          className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 bg-white/10 backdrop-blur-sm rounded-xl py-10 px-6"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div>
            <h3 className="text-3xl font-bold">500+</h3>
            <p>Hogares han reducido su huella de carbono</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">1M+</h3>
            <p>Toneladas de CO₂ evitadas</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">800+</h3>
            <p>Proyectos sostenibles completados</p>
          </div>
        </motion.section>

        <motion.section
          className="w-full max-w-3xl mx-auto bg-white/80 text-black p-6 rounded-xl shadow-lg px-4 md:px-6"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold mb-2">Lo que dicen nuestros usuarios</h3>
          <p className="italic">
            "Las herramientas son intuitivas y nos ayudaron a reducir nuestros costos energéticos un 20% en solo 3 meses."
          </p>
          <p className="mt-2 font-medium">Carlos García, México</p>
        </motion.section>

        <motion.section
          className="w-full max-w-6xl mx-auto text-white text-center mt-12 px-4"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold">
            Comparte tu experiencia o descubre recursos para implementar energías limpias.
          </h2>
          <div className="mt-4 flex flex-wrap gap-4 justify-center">
            <a
              href="/resources"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
              aria-label="Ver recursos"
            >
              Ver recursos
            </a>
            <a
              href="/testimonials"
              className="border border-white px-6 py-3 rounded hover:bg-white hover:text-black transition"
              aria-label="Leer testimonios"
            >
              Leer más testimonios
            </a>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default Home;






















