import React from "react";

const availableRoles = ["USER", "ADVANCED_USER", "ADMIN"];

const RoleSelect = ({ selectedRoles, onChange }) => {
  const handleToggle = (role) => {
    if (selectedRoles.includes(role)) {
      onChange(selectedRoles.filter(r => r !== role));
    } else {
      onChange([...selectedRoles, role]);
    }
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {availableRoles.map(role => (
        <button
          key={role}
          className={`px-3 py-1 rounded border ${
            selectedRoles.includes(role) ? "bg-blue-500 text-white" : "bg-white text-gray-700"
          }`}
          onClick={() => handleToggle(role)}
          type="button"
        >
          {role}
        </button>
      ))}
    </div>
  );
};

export default RoleSelect;
