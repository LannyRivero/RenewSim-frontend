import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModalBase from "@/components/modals/ModalBase"; // <-- Aquí importas

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "¿Estás seguro?",
  description = "Esta acción no se puede deshacer.",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  loading = false,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (        
          <ModalBase isOpen={isOpen} onClose={onClose} title={title}>
            <p className="text-gray-800 dark:text-gray-300 text-sm mb-4">
              {description}
            </p>

            {loading ? (
              <p className="text-blue-600 dark:text-blue-400 font-medium">
                Procesando...
              </p>
            ) : (
              <div className="flex justify-end space-x-3">
                <button
                  onClick={onClose}
                  className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg transition hover:bg-gray-400 dark:hover:bg-gray-600"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg transition hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                >
                  {confirmText}
                </button>
              </div>
            )}
          </ModalBase>       
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;




