import React from "react";

const RoleFilter = ({ selectedRole, onChange }) => {
  return (
    <div className="mb-6 flex items-center gap-2">
      <label className="font-medium text-gray-700">Filtrar por rol:</label>
      <select
        value={selectedRole}
        onChange={(e) => onChange(e.target.value)}
        className="border px-3 py-1 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="ALL">Todos</option>
        <option value="ADMIN">Admin</option>       
        <option value="USER">Basic User</option>
      </select>
    </div>
  );
};

export default RoleFilter;
