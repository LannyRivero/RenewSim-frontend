import React from "react";
import DashboardHeader from '../../pages/dashboard/DashboardHeader';

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <DashboardHeader />
      <div className="min-h-screen bg-gray-100 p-6">
       
        <main className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;