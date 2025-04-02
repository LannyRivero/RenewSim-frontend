import React from "react";

const allRoles = ["ADMIN", "ADVANCED_USER", "BASIC_USER"];

const formatRole = (role) =>
  role
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());


const RoleSelect = ({ selectedRoles, onChange }) => {
  const handleCheckboxChange = (role) => {
    const updatedRoles = selectedRoles.includes(role)
      ? selectedRoles.filter((r) => r !== role)
      : [...selectedRoles, role];
    onChange(updatedRoles);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {allRoles.map((role) => (
        <label
          key={role}
          className={`flex items-center gap-2 px-3 py-1 border rounded-md cursor-pointer transition ${
            selectedRoles.includes(role)
              ? "bg-green-100 border-green-500 text-green-800"
              : "bg-gray-100 hover:bg-gray-200 border-gray-300"
          }`}
        >
          <input
            type="checkbox"
            className="form-checkbox text-green-600"
            checked={selectedRoles.includes(role)}
            onChange={() => handleCheckboxChange(role)}
          />
          <span className="text-sm">{formatRole(role)}</span>
        </label>
      ))}
    </div>
  );
};

export default RoleSelect;

