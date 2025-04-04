import React from "react";
import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardFooter from "./DashboardFooter";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <DashboardHeader />

      {/* Main content */}
      <main className="flex-1 p-6">
        <Outlet /> {/* Aquí se renderizan las rutas hijas */}
      </main>

      {/* Footer */}
      <DashboardFooter />
    </div>
  );
};

export default DashboardLayout;
