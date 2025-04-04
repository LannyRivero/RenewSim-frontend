import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardFooter from "./DashboardFooter";
import AdminSidebar from "./AdminSidebar";
import UserSidebar from "./UserSidebar";
import { Toaster } from "react-hot-toast";

const DashboardLayout = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Detectamos si es ruta admin
  const isAdminRoute = location.pathname.includes("/dashboard/admin");

  return (
    <div className={`${darkMode ? "dark" : ""} flex min-h-screen bg-gray-100 dark:bg-gray-900`}>
      {/* Notificaciones */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Sidebar dinámico */}
      {isAdminRoute ? <AdminSidebar /> : <UserSidebar />}

      {/* Contenedor principal */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <DashboardHeader isAdmin={isAdminRoute} />

        {/* Contenido principal */}
        <main className="flex-1 p-8 text-gray-900 dark:text-gray-100">
          <Outlet />
        </main>

        {/* Footer */}
        <DashboardFooter />
      </div>
    </div>
  );
};

export default DashboardLayout;





