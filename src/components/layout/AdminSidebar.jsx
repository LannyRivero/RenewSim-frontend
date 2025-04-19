import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="bg-white dark:bg-gray-800 p-6 shadow-lg w-64 hidden md:block">
      <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-8">Admin Panel 🚀</h2>

      {/* Menú principal */}
      <nav className="flex flex-col space-y-3 mb-8">
        <NavLink
          to="/dashboard/admin/users"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-md transition ${
              isActive
                ? "bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-white font-semibold"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-white"
            }`
          }
        >
          👥 Gestión de Usuarios
        </NavLink>

        <NavLink
          to="/dashboard/admin/technologies"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-md transition ${
              isActive
                ? "bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-white font-semibold"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-white"
            }`
          }
        >
          ⚙️ Añadir Tecnología
        </NavLink>
        <NavLink
          to="/dashboard/admin/technologies/list"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-md transition ${
              isActive
                ? "bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-white font-semibold"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-white"
            }`
          }
        >
          📜 Ver Tecnologías
        </NavLink>      
      </nav>

      {/* Info adicional si quieres */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <p className="mb-1">Administrador</p>
        <p className="font-medium">Panel de Control</p>
      </div>
    </aside>
  );
};

export default AdminSidebar;

