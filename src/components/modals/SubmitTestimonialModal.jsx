import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const SubmitTestimonialModal = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!message.trim()) {
      toast.error("Por favor escribe tu comentario");
      return;
    }

    const existingTestimonials = JSON.parse(localStorage.getItem("testimonials")) || [];
    const updatedTestimonials = [...existingTestimonials, { message, date: new Date().toISOString() }];
    localStorage.setItem("testimonials", JSON.stringify(updatedTestimonials));

    toast.success("¡Gracias por tu comentario!");

    setMessage("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -50 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
          className="rounded-2xl bg-white/30 backdrop-blur-xl border border-white/30 shadow-2xl p-6 space-y-4 max-w-sm w-full"
          style={{
            background: "rgba(255, 255, 255, 0.25)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            backdropFilter: "blur(15px)",
            WebkitBackdropFilter: "blur(15px)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
          }}
        >
          <h3 className="text-lg font-semibold text-gray-800">
            📝 Deja tu comentario
          </h3>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-32 p-2 border border-gray-300 rounded resize-none"
            placeholder="Escribe tu comentario aquí..."
          />
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="bg-gray-300/60 text-gray-800 px-4 py-2 rounded-lg transition hover:bg-gray-400/70 backdrop-blur-md"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="bg-green-500/70 text-white px-4 py-2 rounded-lg transition hover:bg-green-600/80 backdrop-blur-md"
            >
              Enviar
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SubmitTestimonialModal;

