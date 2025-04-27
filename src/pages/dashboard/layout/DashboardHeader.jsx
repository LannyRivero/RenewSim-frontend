import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const DashboardHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
    
      <div className="text-xl font-bold text-green-700">RenewSim Dashboard</div>

      <nav className="space-x-6 text-sm font-medium">
        <NavLink
          to="/dashboard/simulation"
          className={({ isActive }) =>
            isActive ? "text-green-700 border-b-2 border-green-700" : "text-gray-600 hover:text-green-700"
          }
        >
          Simulación
        </NavLink>
        <NavLink
          to="/dashboard/history"
          className={({ isActive }) =>
            isActive ? "text-green-700 border-b-2 border-green-700" : "text-gray-600 hover:text-green-700"
          }
        >
          Historial
        </NavLink>
        {user?.roles?.includes("ADMIN") && (
          <NavLink
            to="/dashboard/admin/users"
            className={({ isActive }) =>
              isActive ? "text-green-700 border-b-2 border-green-700" : "text-gray-600 hover:text-green-700"
            }
          >
            Admin
          </NavLink>
        )}
      </nav>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700">👋 {user?.username}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm shadow"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
