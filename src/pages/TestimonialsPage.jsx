import React, { useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import SubmitTestimonialModal from "@/components/modals/SubmitTestimonialModal";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonialSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const testimonials = [
  {
    text: "Gracias a este simulador, entendimos cómo implementar paneles solares en nuestro hogar de manera rentable.",
    author: "Ana López, España",
  },
  {
    text: "Las herramientas son intuitivas y nos ayudaron a reducir nuestros costos energéticos un 20% en solo 3 meses.",
    author: "Carlos García, México",
  },
  {
    text: "Un recurso increíble para proyectos sostenibles, hemos logrado un impacto positivo significativo.",
    author: "Mariana Torres, Chile",
  },
];

const TestimonialsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="w-full max-w-3xl mx-auto bg-white bg-opacity-90 p-6 rounded-xl shadow-lg text-center text-gray-900">
      {/* Título */}
      <h2 className="text-3xl font-bold text-green-600 mb-6">Lo que dicen nuestros usuarios</h2>

      {/* Slider */}
      <Slider {...testimonialSettings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <p className="text-lg italic text-gray-700">"{testimonial.text}"</p>
            <span className="mt-2 block text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-md inline-block">
              {testimonial.author}
            </span>
          </div>
        ))}
      </Slider>

      {/* Botón para abrir el modal */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-500 transition-all transform hover:scale-105"
        >
          Comparte tu experiencia
        </button>
      </div>

      {/* Modal para el formulario */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-green-10 p-6 rounded-lg shadow-xl max-w-lg w-full relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-xl"
            >
              ✖
            </button>
            <SubmitTestimonialModal />
          </div>
        </div>
      )}
    </section>
  );
};

export default TestimonialsPage;


