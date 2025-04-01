import React from "react";
import DashboardLayout from "./DashboardLayout";

const AdvancedDashboard = () => {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-semibold text-green-700 mb-4">Welcome, Advanced User 🔬</h2>
      <p className="text-gray-700">Access extended features such as exporting simulations and detailed reports.</p>
    </DashboardLayout>
  );
};

export default AdvancedDashboard;