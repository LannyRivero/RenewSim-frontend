import React from "react";

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 max-w-sm w-full animate-fade-in">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Confirma Acción
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white transition"
          >
            Confirmo
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
