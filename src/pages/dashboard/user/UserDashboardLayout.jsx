import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const UserDashboardLayout = ({ children }) => {
    const { user } = useAuth();
    const [darkMode, setDarkMode] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className={`${darkMode ? "dark" : ""} flex min-h-screen bg-gray-100 dark:bg-gray-900`}>
            {/* Sidebar */}
            <aside className={`bg-white dark:bg-gray-800 p-6 shadow-lg w-64 ${sidebarOpen ? "block" : "hidden"} md:block`}>
                <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-8">RenewSim 🌿</h2>

                {/* Menú principal */}
                <div className="mb-8">
                    <p className="text-gray-500 dark:text-gray-400 uppercase text-xs font-semibold mb-3">
                        Menú principal
                    </p>
                    <nav className="flex flex-col space-y-3">
                        <NavLink
                            to="/dashboard/user"
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-3 py-2 rounded-md transition ${isActive
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
                                `flex items-center gap-2 px-3 py-2 rounded-md transition ${isActive
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
                                `flex items-center gap-2 px-3 py-2 rounded-md transition ${isActive
                                    ? "bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-white font-semibold"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-white"
                                }`
                            }
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
                className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                ☰
            </button>

            {/* Main content */}
            <main className="flex-1 p-8 text-gray-900 dark:text-gray-100">
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

