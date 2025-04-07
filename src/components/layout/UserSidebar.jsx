import React, { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useSimulation } from "@/context/SimulationContext";
import { FaBars, FaTimes } from "react-icons/fa";

const UserSidebar = () => {
  const { user } = useAuth();
  const { simulationId } = useSimulation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isHome = location.pathname === "/";

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Botón hamburguesa (solo en móviles) */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMenu}
          className="text-green-700 dark:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`bg-white dark:bg-gray-800 p-6 shadow-lg w-64 fixed top-0 left-0 h-full z-40 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static md:block`}>

        {/* Logo clickable */}
        <Link
          to="/"
          onClick={() => setIsOpen(false)} // Cierra el menú al hacer clic
          className={`flex items-center gap-2 text-2xl font-bold mb-8 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 rounded ${
            isHome
              ? "text-green-900 dark:text-green-300"
              : "text-green-700 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
          }`}
        >
          RenewSim 🌿
        </Link>

        {/* Menú principal */}
        <nav className="flex flex-col space-y-3 mb-8">
          {[
            { to: "/dashboard/user", label: "📊 Nueva Simulación" },
            { to: "/dashboard/user/history", label: "🧾 Historial" },
            { to: simulationId ? `/dashboard/user/comparison/${simulationId}` : "#", label: "📈 Comparación", disabled: !simulationId },
            { to: "/dashboard/user/global-comparison", label: "🌍 Comparación Global" },
            { to: "/dashboard/user/settings", label: "⚙️ Configuración" },
          ].map(({ to, label, disabled }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setIsOpen(false)} // Cierra el menú al navegar
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition ${
                  isActive
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-white font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-white"
                } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`
              }
              onClickCapture={(e) => {
                if (disabled) e.preventDefault();
              }}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Info usuario */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <p className="mb-1">Usuario:</p>
          <p className="font-medium break-all">{user.email}</p>
        </div>
      </aside>
    </>
  );
};

export default UserSidebar;




