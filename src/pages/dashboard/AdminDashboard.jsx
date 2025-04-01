import React from "react";
import DashboardLayout from "./DashboardLayout";

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-semibold text-green-700 mb-4">Admin Panel 🛠️</h2>
      <p className="text-gray-700">Manage users, roles, and oversee system-wide simulation data.</p>
    </DashboardLayout>
  );
};

export default AdminDashboard;