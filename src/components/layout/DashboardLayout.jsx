import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardFooter from "./DashboardFooter";
import AdminSidebar from "./AdminSidebar";
import UserSidebar from "./UserSidebar";
import { Toaster } from "react-hot-toast";

const DashboardLayout = () => {
  const location = useLocation();

  const isAdminRoute = location.pathname.includes("/dashboard/admin");

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Toaster position="top-right" reverseOrder={false} />
      <DashboardHeader isAdmin={isAdminRoute} />

      <div className="flex flex-1">

        {isAdminRoute ? <AdminSidebar /> : <UserSidebar />}
        <main className="flex-1 px-8 pt-4 pb-8 text-gray-900">
          <Outlet />
        </main>
      </div>
      <DashboardFooter />
    </div>
  );
};

export default DashboardLayout;







