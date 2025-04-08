import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ConfirmModal = ({
  show,
  onClose,
  onConfirm,
  title = "¿Estás seguro?",
  description = "Esta acción no se puede deshacer.",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  loading = false,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -50 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
          className="rounded-2xl bg-white/30 dark:bg-white/10 backdrop-blur-xl border border-white/30 dark:border-white/20 shadow-2xl p-6 space-y-4 max-w-sm w-full"
          style={{
            background: "rgba(255, 255, 255, 0.25)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            backdropFilter: "blur(15px)",
            WebkitBackdropFilter: "blur(15px)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
          }}
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {title}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm">{description}</p>

          {loading ? (
            <p className="text-blue-600 dark:text-blue-400 font-medium">
              Procesando...
            </p>
          ) : (
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="bg-gray-300/60 dark:bg-gray-600/40 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg transition hover:bg-gray-400/70 dark:hover:bg-gray-500/70 backdrop-blur-md"
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                className="bg-red-500/70 dark:bg-red-600/60 text-white px-4 py-2 rounded-lg transition hover:bg-red-600/80 dark:hover:bg-red-700/80 backdrop-blur-md"
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


