import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-green-600 text-white py-4 px-6 rounded-lg shadow-md mb-6">
        <h1 className="text-xl font-semibold">RenewSim Dashboard</h1>
      </header>
      <main className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;