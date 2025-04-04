import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Users, CheckCircle, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DashboardHeader = ({ message }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = user?.roles?.includes("ADMIN");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Definimos título dinámico según rol
  const title = isAdmin ? "Panel de Administración" : "RenewSim Dashboard";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 bg-green-50 p-4 rounded-2xl shadow-md">
      {/* Título dinámico */}
      <h2 className="text-2xl sm:text-3xl font-bold text-green-700 flex items-center gap-2 mb-3 sm:mb-0">
        {isAdmin && <Users className="w-6 h-6 sm:w-7 sm:h-7" />}
        {title}
      </h2>

      <div className="flex items-center gap-4">
        {/* Mensaje dinámico si existe */}
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

        {/* Info usuario + logout */}
        <div className="flex items-center space-x-4 text-sm">
          <span className="text-gray-700">
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
