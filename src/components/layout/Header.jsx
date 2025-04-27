import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, AlertTriangle, LogOut, Home } from "lucide-react";
import {
  FaHome,
  FaCog,
  FaClipboardList,
  FaBook,
  FaBars,
  FaTimes,
  FaShieldAlt,
  FaHistory
} from "react-icons/fa";
import logo from '@/assets/8408600.jpg';
import Button from "@/components/common/button/Button";
import ConfirmModal from "@/components/modals/ConfirmModal";
import RoleBasedAccess from "../auth/RoleBasedAccess";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { user, logout, setUser } = useAuth();
  const { notification } = useNotification();
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboard = location.pathname.includes("/dashboard");

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    navigate("/");
  };

  const titles = {
    "/dashboard/user": "Bienvenido 👋",
    "/dashboard/user/history": "Historial de Simulaciones 🧾",
    "/dashboard/user/settings": "Configuración Avanzada ⚙️",
    "/dashboard/admin/users": "Panel de Administración 👥",
    "/dashboard/user/global-comparison": "Comparación Global 🌍",
    "/dashboard/user/comparison": "Comparativa de Simulación 📊",
  };

  const title = titles[location.pathname] || "Dashboard";

  const getInitials = (name) => {
    if (!name) return "";
    const names = name.split(" ");
    return names.map((n) => n[0].toUpperCase()).join("");
  };

  return (
    <header className="w-full shadow-md py-3 px-4 md:px-12 flex items-center justify-between bg-gradient-to-b from-green-50 to-white">
      <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition">
        <img src={logo} alt="Logo" className="w-10 h-10 rounded-full object-cover" />
        <h1 className="text-lg font-bold text-gray-700 dark:text-white">Renewable Energy Simulator</h1>
      </Link>

      {isDashboard && (
        <h2 className="text-2xl sm:text-3xl font-bold text-green-700 hidden md:block">{title}</h2>
      )}

      <div className="flex items-center space-x-4">
        <AnimatePresence>
          {isDashboard && notification && (
            <motion.span
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full shadow-md transition-all ${notification.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
            >
              {notification.type === "success" ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
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

        {isDashboard ? (
          <>
            {user?.roles?.includes("ADMIN") && user?.roles?.includes("USER") && (
              <Button
                variant="secondary"
                onClick={() => {
                  if (location.pathname.includes("/admin")) {
                    navigate("/dashboard/user");
                  } else {
                    navigate("/dashboard/admin/users");
                  }
                }}
                className="flex items-center gap-2"
              >
                <FaShieldAlt className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {location.pathname.includes("/admin")
                    ? "Ir al Panel de Usuario"
                    : "Ir al Panel de Admin"}
                </span>
              </Button>

            )}

            <Button variant="success" onClick={() => navigate("/")} className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Inicio</span>
            </Button>

            <Button variant="danger" onClick={() => setShowLogoutConfirm(true)} className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Cerrar sesión</span>
            </Button>
          </>
        ) : user ? (
          <Button variant="danger" onClick={() => setShowLogoutConfirm(true)} className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Cerrar sesión</span>
          </Button>
        ) : (
          <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">Iniciar sesión</Link>
        )}

        <button onClick={toggleMenu} className="md:hidden text-xl">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {menuOpen && (
        <nav className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-md flex flex-col items-center py-4 space-y-4 md:hidden z-40">
          <NavLink to="/" icon={<FaHome />} label="Home" active={location.pathname === "/"} />

          <RoleBasedAccess allowedRoles={['USER', 'ADVANCED_USER', 'ADMIN']}>
            <>
              <NavLink to="/configuration" icon={<FaCog />} label="Configuration" active={location.pathname === "/configuration"} />
              <NavLink to="/recommendations" icon={<FaClipboardList />} label="Recommendations" active={location.pathname === "/recommendations"} />
              <NavLink to="/resources" icon={<FaBook />} label="Resources" active={location.pathname === "/resources"} />
              <NavLink to="/history" icon={<FaHistory />} label="Historial" active={location.pathname === "/history"} />
            </>
          </RoleBasedAccess>

          <RoleBasedAccess allowedRoles={['ADMIN']}>
            <NavLink to="/admin/users" icon={<FaShieldAlt />} label="Panel Admin" active={location.pathname === "/admin/users"} />
          </RoleBasedAccess>
        </nav>
      )}

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

const NavLink = ({ to, icon, label, active }) => (
  <Link to={to} className={`flex items-center space-x-2 text-gray-700 dark:text-white hover:text-blue-500 transition ${active ? "font-bold" : ""}`}>
    {icon}
    <span>{label}</span>
  </Link>
);

export default Header;












