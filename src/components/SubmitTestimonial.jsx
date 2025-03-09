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
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl border border-gray-200">
      {submitted ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-green-600">¡Gracias por tu testimonio!</h1>
          <p className="text-gray-700">Tu experiencia es muy valiosa para nosotros.</p>
          <button 
            onClick={() => setSubmitted(false)} 
            className="mt-4 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            Enviar otro testimonio
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center">¡Comparte tu experiencia!</h1>
          <p className="text-gray-600 text-center">Tu opinión nos ayuda a mejorar. Completa este formulario para compartir tu testimonio.</p>
          
          <div>
            <label className="block font-semibold text-gray-700">Nombre:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Escribe tu nombre"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Ubicación:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Escribe tu ubicación"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Tu experiencia:</label>
            <textarea
              name="testimonial"
              value={formData.testimonial}
              onChange={handleInputChange}
              placeholder="Escribe tu experiencia aquí"
              rows="4"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
            {errors.testimonial && <p className="text-red-500 text-sm mt-1">{errors.testimonial}</p>}
          </div>

          <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
            Enviar Testimonio
          </button>
        </form>
      )}
    </div>
  );
};

export default SubmitTestimonial;
