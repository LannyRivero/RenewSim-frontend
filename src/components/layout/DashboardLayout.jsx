import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import DashboardHeader from "./DashboardHeader";
import DashboardFooter from "./DashboardFooter";
import AdminSidebar from "./AdminSidebar";
import UserSidebar from "./UserSidebar";

const DashboardLayout = () => {
    const { user } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const isAdmin = user?.roles?.includes("ADMIN");

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Header */}
            <DashboardHeader toggleSidebar={toggleSidebar} />

            {/* Sidebar toggle button (mobile only) */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded shadow"
                onClick={toggleSidebar}
            >
                ☰
            </button>

            {/* Layout */}
            <div className="flex flex-1">
                {/* Sidebar */}

                <div
                    className={`transition-transform duration-300 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                        } md:translate-x-0 md:block`}
                >
                    {isAdmin ? <AdminSidebar /> : <UserSidebar />}
                </div>

                {/* Main content */}
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>

            {/* Footer */}
            <DashboardFooter />
        </div>
    );
};

export default DashboardLayout;


