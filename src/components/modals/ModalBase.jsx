import React from "react";

const ModalBase = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500">
            ✕
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default ModalBase;
