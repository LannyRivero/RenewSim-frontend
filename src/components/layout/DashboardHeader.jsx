import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useNotification } from "@/context/NotificationContext";
import { useAuth } from "@/context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, AlertTriangle, LogOut, Home } from "lucide-react";
import Button from "@/components/common/button/Button";
import ConfirmModal from "@/components/modals/ConfirmModal";

const DashboardHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { notification } = useNotification();
  const { user, setUser, logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const titles = {
    "/dashboard/user": "Bienvenido 👋",
    "/dashboard/user/history": "Historial de Simulaciones 🧾",
    "/dashboard/user/settings": "Configuración Avanzada ⚙️",
    "/dashboard/admin/users": "Panel de Administración 👥",
    "/dashboard/user/global-comparison": "Comparación Global 🌍",
    "/dashboard/user/comparison": "Comparativa de Simulación 📊",
  };

  const title = titles[location.pathname] || "Dashboard";

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/");
  };

  const getInitials = (name) => {
    if (!name) return "";
    const names = name.split(" ");
    return names.map((n) => n[0].toUpperCase()).join("");
  };

  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gradient-to-b from-green-50 to-white h-24 p-4 shadow-md relative">

      <h2 className="text-2xl sm:text-3xl font-bold text-green-700 flex items-center gap-2 mb-3 sm:mb-0">
        {title}
      </h2>

      <div className="flex items-center gap-4 flex-wrap">

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

        {user && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg shadow">
            <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              {getInitials(user.username || user.email)}
            </div>
            <span className="text-sm text-gray-700">{user.username || user.email}</span>
          </div>
        )}

        <Button variant="success" onClick={() => navigate("/")} className="flex items-center gap-2">
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline">Inicio</span>
        </Button>

        <Button variant="danger" onClick={() => setShowLogoutConfirm(true)} className="flex items-center gap-2">
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Cerrar sesión</span>
        </Button>
      </div>

      <ConfirmModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
        title="Cerrar sesión"
        description="¿Estás seguro de que quieres cerrar sesión?"
        confirmText="Cerrar sesión"
        cancelText="Cancelar"
      />
    </header>
  );
};

export default DashboardHeader;



