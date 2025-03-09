import React from "react";
import TestimonialsSection from "../components/TestimonialsSection";
import SubmitTestimonial from "../components/SubmitTestimonial";

const TestimonialsPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-green-700 mb-6">Testimonios</h1>
      <p className="text-gray-600 text-lg text-center max-w-2xl mb-8">
        Comparte tu experiencia con nosotros y ayúdanos a mejorar nuestras soluciones en energías renovables.
      </p>

      {/* Sección de testimonios (slider) */}
      <div className="w-full flex justify-center">
        <TestimonialsSection />
      </div>

      {/* Formulario para enviar testimonios */}
      <div className="w-full flex justify-center mt-12">
        <SubmitTestimonial />
      </div>
    </div>
  );
};

export default TestimonialsPage;

