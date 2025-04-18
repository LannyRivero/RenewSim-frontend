import React from "react";
import { ShieldCheck } from "lucide-react"; 

const allRoles = ["ADMIN", "BASIC_USER"];

const roleMap = {
  ADMIN: "ADMIN",
  USER: "BASIC_USER",
};

const inverseRoleMap = Object.fromEntries(
  Object.entries(roleMap).map(([k, v]) => [v, k])
);

const formatRole = (role) =>
  role
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

const RoleSelect = ({ selectedRoles, onChange, originalRoles = [] }) => {
  const handleCheckboxChange = (role) => {
    const updatedRoles = selectedRoles.includes(role)
      ? selectedRoles.filter((r) => r !== role)
      : [...selectedRoles, role];
    onChange(updatedRoles);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {allRoles.map((role) => {
        const isSelected = selectedRoles.includes(role);
        const originalBackendRole = inverseRoleMap[role];
        const isOriginal = originalRoles.includes(originalBackendRole);

        return (
          <div
            key={role}
            className="relative group transition transform hover:scale-[1.02]"
          >
            <label
              className={`flex items-center gap-2 px-3 py-1 border rounded-full shadow-sm cursor-pointer transition-all duration-200 ${
                isSelected
                  ? "bg-green-100 border-green-500 text-green-800"
                  : "bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-700"
              } ${isOriginal ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              <input
                type="checkbox"
                className="form-checkbox text-green-600"
                checked={isSelected}
                disabled={isOriginal}
                onChange={() => handleCheckboxChange(role)}
              />
              <span className="text-sm font-medium">{formatRole(role)}</span>

              {isOriginal && (
                <ShieldCheck
                  className="text-blue-500 w-4 h-4"
                  title="Este rol está asignado por el sistema"
                />
              )}
            </label>

            {isOriginal && (
              <div className="absolute bottom-full left-0 mb-1 w-56 text-xs text-white bg-gray-800 px-3 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                Este rol está asignado por el sistema y no puede modificarse.
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RoleSelect;

