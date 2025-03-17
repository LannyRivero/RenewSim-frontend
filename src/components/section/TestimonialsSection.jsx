import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
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

const TestimonialsSection = () => {
  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-white shadow-lg rounded-xl border border-gray-200 text-center">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Lo que dicen nuestros usuarios</h2>
      
      <Slider {...testimonialSettings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
            <p className="text-lg italic text-gray-700">"{testimonial.text}"</p>
            <span className="block mt-4 text-sm font-semibold text-green-600">{testimonial.author}</span>
          </div>
        ))}
      </Slider>
      
      <Link to="/submit-testimonial" className="block mt-6 text-green-600 font-semibold hover:underline">
        ¿Quieres compartir tu experiencia? Haz clic aquí.
      </Link>
    </div>
  );
};

export default TestimonialsSection;
