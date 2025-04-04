import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const UserSidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="bg-white dark:bg-gray-800 p-6 shadow-lg w-64 hidden md:block">
      <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-8">RenewSim 🌿</h2>

      {/* Menú principal */}
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

      {/* Info usuario */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <p className="mb-1">Usuario:</p>
        <p className="font-medium break-all">{user.email}</p>
      </div>
    </aside>
  );
};

export default UserSidebar;
