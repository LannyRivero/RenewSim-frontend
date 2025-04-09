import React from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -50 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
          className="rounded-2xl bg-white/80 dark:bg-gray-800/90 backdrop-blur-md border border-white/30 dark:border-gray-700 shadow-2xl p-6 space-y-4 max-w-sm w-full"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          <p className="text-gray-800 dark:text-gray-300 text-sm">
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ConfirmModal;



