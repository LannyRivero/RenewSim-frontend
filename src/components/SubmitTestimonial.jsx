import React, { useState } from "react";

const SubmitTestimonial = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    testimonial: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!formData.location.trim()) newErrors.location = "La ubicación es obligatoria.";
    if (formData.testimonial.length < 10) newErrors.testimonial = "El testimonio debe tener al menos 10 caracteres.";
    return newErrors;
  };

  const resetForm = () => {
    setFormData({
      name: "",
      location: "",
      testimonial: "",
    });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setSubmitted(true);
      resetForm();
    }
  };

  return (
    <div className="mt-10 mx-auto max-w-2xl bg-gradient-to-r from-gray-800 to-green-700 p-8 rounded-lg shadow-lg text-white text-center animate-fadeIn">
      {submitted ? (
        <div>
          <h1 className="text-2xl font-bold">¡Gracias por tu testimonio!</h1>
          <p className="mt-2 text-lg">Tu experiencia es muy valiosa para nosotros.</p>
          <button 
            className="mt-4 bg-green-500 hover:bg-green-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition transform hover:scale-105"
            onClick={() => setSubmitted(false)}
          >
            Enviar otro testimonio
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-3xl font-bold">¡Comparte tu experiencia!</h1>
          <p className="text-lg text-gray-300">Tu opinión nos ayuda a mejorar.</p>

          <div className="text-left">
            <label className="block text-lg font-semibold">Nombre:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Escribe tu nombre"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500"
              required
            />
            {errors.name && <p className="text-red-400">{errors.name}</p>}
          </div>

          <div className="text-left">
            <label className="block text-lg font-semibold">Ubicación:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Escribe tu ubicación"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500"
              required
            />
            {errors.location && <p className="text-red-400">{errors.location}</p>}
          </div>

          <div className="text-left">
            <label className="block text-lg font-semibold">Tu experiencia:</label>
            <textarea
              name="testimonial"
              value={formData.testimonial}
              onChange={handleInputChange}
              placeholder="Escribe tu experiencia aquí"
              rows="5"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500"
              required
            ></textarea>
            {errors.testimonial && <p className="text-red-400">{errors.testimonial}</p>}
          </div>

          <button 
            type="submit"
            className="w-full bg-green-500 hover:bg-green-400 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition transform hover:scale-105"
          >
            Enviar Testimonio
          </button>
        </form>
      )}
    </div>
  );
};

export default SubmitTestimonial;

