import React from "react";
import { useLocation } from "react-router-dom";
import { useNotification } from "@/context/NotificationContext";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertTriangle } from "lucide-react";

const DashboardHeader = () => {
  const location = useLocation();
  const { notification } = useNotification();

  const titles = {
    "/dashboard/user": "Bienvenido 👋",
    "/dashboard/user/history": "Historial de Simulaciones 🧾",
    "/dashboard/user/settings": "Configuración Avanzada ⚙️",
    "/dashboard/admin/users": "Panel de Administración 👥",
  };

  const title = titles[location.pathname] || "Dashboard";

  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 bg-green-50 p-4 rounded-2xl shadow-md">
      <h2 className="text-2xl sm:text-3xl font-bold text-green-700 flex items-center gap-2 mb-3 sm:mb-0">
        {title}
      </h2>

      <AnimatePresence>
        {notification && (
          <motion.span
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full shadow-md transition-all ${
              notification.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <AlertTriangle className="w-4 h-4" />
            )}
            {notification.text}
          </motion.span>
        )}
      </AnimatePresence>
    </header>
  );
};

export default DashboardHeader;




