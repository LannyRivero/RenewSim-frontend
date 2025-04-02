import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, User, Crown } from "lucide-react";

const DashboardFooter = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const roles = user.roles || [];
  const isAdmin = roles.includes("ADMIN");
  const isAdvanced = roles.includes("ADVANCED_USER");
  const isUser = !isAdmin && !isAdvanced;

  const getRoleBadge = () => {
    const baseClasses = "flex items-center gap-1 px-2 py-1 text-sm rounded-md transition hover:scale-105 cursor-pointer";
    
    if (isAdmin) {
      return (
        <span
          className={`${baseClasses} bg-red-100 text-red-600 font-semibold`}
          title="Administra usuarios, configuraciones y más"
          onClick={() => navigate("/dashboard/admin/users")}
        >
          <Crown size={16} />
          Admin Panel
        </span>
      );
    }

    if (isAdvanced) {
      return (
        <span
          className={`${baseClasses} bg-yellow-100 text-yellow-600 font-medium`}
          title="Accede a funciones avanzadas del simulador"
          onClick={() => navigate("/dashboard/advanced")}
        >
          <ShieldCheck size={16} />
          Advanced User
        </span>
      );
    }

    return (
      <span
        className={`${baseClasses} bg-blue-100 text-blue-600 font-medium`}
        title="Panel básico del simulador"
        onClick={() => navigate("/dashboard/simulation")}
      >
        <User size={16} />
        User Dashboard
      </span>
    );
  };

  return (
    <footer className="w-full border-t text-xs text-gray-600 bg-white px-4 py-2 flex justify-between items-center animate-fade-in-down">
      <span>© 2025 RenewSim. All rights reserved.</span>
      <div className="flex items-center gap-2">
        <span className="text-gray-500 hidden sm:inline">Logged in as:</span>
        <span className="text-gray-800 font-medium">{user.username}</span>
        {getRoleBadge()}
      </div>
    </footer>
  );
};

export default DashboardFooter;


