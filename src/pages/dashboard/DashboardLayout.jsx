import React from "react";
import DashboardHeader from "../../pages/dashboard/DashboardHeader";
import DashboardFooter from "../../pages/dashboard/DashboardFooter";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="min-h-screen bg-gray-100 p-6">
        <main className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6">
          <Outlet /> {/* Aquí se renderizan las rutas hijas */}
        </main>
      </div>
      <DashboardFooter />
    </div>
  );
};

export default DashboardLayout;
