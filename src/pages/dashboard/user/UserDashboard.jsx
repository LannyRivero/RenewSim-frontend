import React from "react";
import { Outlet } from "react-router-dom";
import UserDashboardLayout from "./UserDashboardLayout";

const UserDashboard = () => {
  return (
    <UserDashboardLayout>
      <Outlet />
    </UserDashboardLayout>
  );
};

export default UserDashboard;






