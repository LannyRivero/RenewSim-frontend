import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardFooter from "./DashboardFooter";
import AdminSidebar from "./AdminSidebar";
import UserSidebar from "./UserSidebar";
import { Toaster } from "react-hot-toast";

const DashboardLayout = () => {
  const location = useLocation();

  // Detectamos si es ruta admin
  const isAdminRoute = location.pathname.includes("/dashboard/admin");

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Notificaciones */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Header */}
      <DashboardHeader isAdmin={isAdminRoute} />

      {/* Contenedor principal */}
      <div className="flex flex-1">
        {/* Sidebar dinámico */}
        {isAdminRoute ? <AdminSidebar /> : <UserSidebar />}

        {/* Contenido principal */}
        <main className="flex-1 px-8 pt-4 pb-8 text-gray-900">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <DashboardFooter />
    </div>
  );
};

export default DashboardLayout;







