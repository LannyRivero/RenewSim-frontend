import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useSimulation } from "@/context/SimulationContext";

const UserSidebar = () => {
  const { user } = useAuth();
  const { simulationId } = useSimulation();
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <aside className="bg-green-50 dark:bg-gray-800 p-6 shadow-lg w-64 hidden md:flex flex-col justify-between">
      
      {/* Branding limpio */}
      <div>
        <div className="flex items-center gap-2 text-xl font-bold mb-8 text-green-700 dark:text-green-400">
          🌿 RenewSim
        </div>

        {/* Main navigation */}
        <nav className="flex flex-col space-y-3 mb-8">
          <NavLink
            to="/dashboard/user"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md transition ${
                isActive
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-white font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-white"
              }`
            }
          >
            📊 Nueva Simulación
          </NavLink>

          <NavLink
            to="/dashboard/user/history"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md transition ${
                isActive
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-white font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-white"
              }`
            }
          >
            🧾 Historial
          </NavLink>

          <NavLink
            to={simulationId ? `/dashboard/user/comparison/${simulationId}` : "#"}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md transition ${
                isActive
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-white font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-white"
              } ${!simulationId ? "opacity-50 cursor-not-allowed" : ""}`
            }
            onClick={(e) => {
              if (!simulationId) e.preventDefault();
            }}
          >
            📈 Comparación
          </NavLink>

          <NavLink
            to="/dashboard/user/global-comparison"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md transition ${
                isActive
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-white font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-white"
              }`
            }
          >
            🌍 Comparación Global
          </NavLink>

          <NavLink
            to="/dashboard/user/settings"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md transition ${
                isActive
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-white font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-white"
              }`
            }
          >
            ⚙️ Configuración
          </NavLink>
        </nav>
      </div>

    </aside>
  );
};

export default UserSidebar;




