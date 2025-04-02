import React from "react";
import { Users } from "lucide-react";

const AdminHeader = ({ message }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-3xl font-bold text-green-700 flex items-center gap-2">
        <Users className="w-7 h-7" /> Panel de Administración
      </h2>
      {message && (
        <span
          className={`text-sm px-4 py-2 rounded-full ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </span>
      )}
    </div>
  );
};

export default AdminHeader;
