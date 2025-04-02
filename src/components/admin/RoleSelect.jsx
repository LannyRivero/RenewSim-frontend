import React from "react";

const allRoles = ["ADMIN", "ADVANCED_USER", "BASIC_USER"];

const roleMap = {
  ADMIN: "ADMIN",
  ADVANCED_USER: "ADVANCED_USER",
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
          <div key={role} className="relative group">
            <label
              className={`flex items-center gap-2 px-3 py-1 border rounded-md cursor-pointer transition ${
                isSelected
                  ? "bg-green-100 border-green-500 text-green-800"
                  : "bg-gray-100 hover:bg-gray-200 border-gray-300"
              } ${isOriginal ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              <input
                type="checkbox"
                className="form-checkbox text-green-600"
                checked={isSelected}
                disabled={isOriginal}
                onChange={() => handleCheckboxChange(role)}
              />
              <span className="text-sm">{formatRole(role)}</span>

              {isOriginal && (
                <span className="text-xs text-blue-500 ml-1">ℹ️</span>
              )}
            </label>

            {isOriginal && (
              <div className="absolute bottom-full left-0 mb-1 w-48 text-xs text-white bg-gray-800 px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                Este rol está asignado por el sistema y no se puede modificar.
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RoleSelect;
