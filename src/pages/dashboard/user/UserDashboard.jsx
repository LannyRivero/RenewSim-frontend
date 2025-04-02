import React from "react";
import DashboardLayout from "../DashboardLayout";

const UserDashboard = () => {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-semibold text-green-700 mb-4">Welcome, User 👋</h2>
      <p className="text-gray-700">Here you can run simulations, compare results, and explore energy-saving opportunities.</p>
      
    </DashboardLayout>
  );
};

export default UserDashboard;
