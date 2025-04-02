import React from "react";
import { Users, CheckCircle, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdminHeader = ({ message }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 bg-green-50 p-4 rounded-2xl shadow-md">
      <h2 className="text-2xl sm:text-3xl font-bold text-green-700 flex items-center gap-2 mb-3 sm:mb-0">
        <Users className="w-6 h-6 sm:w-7 sm:h-7" />
        Panel de Administración
      </h2>

      <AnimatePresence>
        {message && (
          <motion.span
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full shadow-md transition-all ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <AlertTriangle className="w-4 h-4" />
            )}
            {message.text}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminHeader;

