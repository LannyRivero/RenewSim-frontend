import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import DashboardHeader from "./DashboardHeader";
import DashboardFooter from "./DashboardFooter";
import AdminSidebar from "./AdminSidebar";
import UserSidebar from "./UserSidebar";

const DashboardLayout = () => {
  const { user } = useAuth();

  // Verifica si el usuario es ADMIN
  const isAdmin = user?.roles?.includes("ADMIN");

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <DashboardHeader />

      {/* Contenido con sidebar */}
      <div className="flex flex-1">
        {/* Sidebar dinámico */}
        {isAdmin ? <AdminSidebar /> : <UserSidebar />}

        {/* Main content */}
        <main className="flex-1 p-6">
          <Outlet /> {/* Aquí se renderizan las rutas hijas */}
        </main>
      </div>

      {/* Footer */}
      <DashboardFooter />
    </div>
  );
};

export default DashboardLayout;

