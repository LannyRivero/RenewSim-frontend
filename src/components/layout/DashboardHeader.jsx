import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Users, CheckCircle, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNotification } from "@/context/NotificationContext"; 

const DashboardHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { notification } = useNotification(); 

  const isAdmin = user?.roles?.includes("ADMIN");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  //  Breadcrumb dinámico
  const pathParts = location.pathname.split("/").filter(Boolean);
  const breadcrumb =
    pathParts.slice(1).map(part => {
      if (part === "user") return "Usuario";
      if (part === "admin") return "Administrador";
      if (part === "history") return "Historial";
      if (part === "settings") return "Configuración";
      if (part === "users") return "Gestión de usuarios";
      return part.charAt(0).toUpperCase() + part.slice(1);
    }).join(" / ") || "Inicio";

  // Título dinámico
  const title = isAdmin ? "Panel de Administración" : "RenewSim Dashboard";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 bg-green-50 p-4 rounded-2xl shadow-md">
      {/* Título + breadcrumb */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-green-700 flex items-center gap-2 mb-1 sm:mb-0">
          {isAdmin && <Users className="w-6 h-6 sm:w-7 sm:h-7" />}
          {title}
        </h2>
        <p className="text-sm text-gray-500 capitalize">{breadcrumb}</p>
      </div>

      {/* Mensaje dinámico + info usuario */}
      <div className="flex items-center gap-4 flex-wrap justify-end">
        {/* Mensaje global dinámico desde context */}
        <AnimatePresence>
          {notification && (
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
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

        {/* Info usuario + logout */}
        <div className="flex items-center space-x-4 text-sm">
          <span className="text-gray-700 dark:text-gray-300">
            {user?.username} ({user?.roles?.join(", ")})
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;


