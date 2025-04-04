import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const UserDashboardLayout = ({ children }) => {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Persistencia del modo oscuro
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const isActive = (path) => location.pathname === path;

  const handleNavClick = () => {
    if (sidebarOpen) {
      setSidebarOpen(false); // Cierra el sidebar en móvil al navegar
    }
  };

  const linkClasses = (active) =>
    `flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 ${
      active
        ? "bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-white font-semibold"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-white"
    }`;

  return (
    <div className={`${darkMode ? "dark" : ""} flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300`}>
      {/* Sidebar */}
      <aside className={`bg-white dark:bg-gray-800 p-6 shadow-lg w-64 transition-transform duration-300 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:block`}>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-8">RenewSim 🌿</h2>

        {/* Menú principal */}
        <div className="mb-8">
          <p className="text-gray-500 dark:text-gray-400 uppercase text-xs font-semibold mb-3">
            Menú principal
          </p>
          <nav className="flex flex-col space-y-3">
            <NavLink
              to="/dashboard/user"
              onClick={handleNavClick}
              className={linkClasses(isActive("/dashboard/user"))}
              aria-current={isActive("/dashboard/user") ? "page" : undefined}
            >
              📊 Nueva Simulación
            </NavLink>

            <NavLink
              to="/dashboard/user/history"
              onClick={handleNavClick}
              className={linkClasses(isActive("/dashboard/user/history"))}
              aria-current={isActive("/dashboard/user/history") ? "page" : undefined}
            >
              🧾 Historial
            </NavLink>

            <NavLink
              to="/dashboard/user/settings"
              onClick={handleNavClick}
              className={linkClasses(isActive("/dashboard/user/settings"))}
              aria-current={isActive("/dashboard/user/settings") ? "page" : undefined}
            >
              ⚙️ Configuración
            </NavLink>
          </nav>
        </div>

        {/* Toggle modo oscuro */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-2 rounded-md w-full text-left transition hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          {darkMode ? "☀️ Modo claro" : "🌙 Modo oscuro"}
        </button>

        {/* Info usuario */}
        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p className="mb-1">Usuario:</p>
          <p className="font-medium break-all">{user.email}</p>
        </div>
      </aside>

      {/* Sidebar toggle (responsive) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded transition hover:bg-blue-700"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      {/* Main content */}
      <main className="flex-1 p-8 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">
            Bienvenido, {user.username} 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Gestiona tus simulaciones de energía renovable.
          </p>
        </header>

        {children}
      </main>
    </div>
  );
};

export default UserDashboardLayout;



