import React, { useEffect } from "react";

const ErrorToast = ({ message, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(onClose, 5000);
    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg text-sm z-50 flex items-center gap-3 animate-fade-in-up">
      <span className="text-xl">⚠️</span>
      <span className="flex-1">{message}</span>
      <button
        onClick={onClose}
        className="text-white font-bold text-lg hover:text-gray-200 transition"
        title="Cerrar"
      >
        ❌
      </button>
    </div>
  );
};

export default ErrorToast;

