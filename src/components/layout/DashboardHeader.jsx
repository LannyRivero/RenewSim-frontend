import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useNotification } from "@/context/NotificationContext";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertTriangle, LogOut } from "lucide-react";



const DashboardHeader = ({ darkMode, setDarkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { notification } = useNotification();
  const { user, setUser, logout} = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);


  const titles = {
    "/dashboard/user": "Bienvenido 👋",
    "/dashboard/user/history": "Historial de Simulaciones 🧾",
    "/dashboard/user/settings": "Configuración Avanzada ⚙️",
    "/dashboard/admin/users": "Panel de Administración 👥",
  };

  const title = titles[location.pathname] || "Dashboard";

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      logout();
      setUser(null);
      navigate("/");
    }, 
  ); 
  };
  

  const getInitials = (name) => {
    if (!name) return "";
    const names = name.split(" ");
    return names.map((n) => n[0].toUpperCase()).join("");
  };

  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 bg-green-50 p-4 rounded-2xl shadow-md relative">
      {/* Título dinámico */}
      <h2 className="text-2xl sm:text-3xl font-bold text-green-700 flex items-center gap-2 mb-3 sm:mb-0">
        {title}
      </h2>

      <div className="flex items-center gap-4 flex-wrap">
   
        {/* Notificación animada */}
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

        {/* Nombre del usuario y avatar */}
        {user && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg shadow">
            <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              {getInitials(user.username || user.email)}
            </div>
            <span className="text-sm text-gray-700">{user.username || user.email}</span>
          </div>
        )}

        {/* Botón de cerrar sesión */}
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-all text-sm sm:text-base"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Cerrar sesión</span>
        </button>
      </div>

      {/* Modal de confirmación con animación */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0  flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-lg text-center space-y-4"
            >
              <p className="text-lg font-semibold text-gray-700">¿Estás seguro de que quieres cerrar sesión?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Cerrar sesión
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default DashboardHeader;
