import React, { useEffect } from "react";

const ErrorToast = ({ message, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(onClose, 5000); // cierra después de 5 segundos
    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg text-sm z-50 animate-fade-in-up">
      <span>{message}</span>
    </div>
  );
};

export default ErrorToast;
