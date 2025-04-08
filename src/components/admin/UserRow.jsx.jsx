import React from "react";
import RoleSelect from "./RoleSelect";

const mapBackendRoleToLabel = (role) => {
  if (!role || typeof role !== "string") return null;

  switch (role.toUpperCase()) {
    case "ADMIN":
      return "Admin";
    case "ADVANCED_USER":
      return "Advanced User";
    case "USER":
      return "Basic User";
    default:
      return null;
  }
};

const UserRow = ({
  user,
  currentRoles = [],
  originalRoles = [],
  loadingUserId,
  onRoleChange,
  onSave,
  onCancel,
  onDelete,
}) => {
  const rolesChanged =
    JSON.stringify(originalRoles.sort()) !== JSON.stringify(currentRoles.sort());

  const displayedRoles = (Array.isArray(currentRoles) ? currentRoles : [])
    .filter((r) => typeof r === "string")
    .map((r) => r.toUpperCase())
    .map(mapBackendRoleToLabel)
    .filter(Boolean);

  return (
    <tr className="odd:bg-white even:bg-gray-50 hover:bg-green-50 transition-all duration-200">
      <td className="p-4 font-medium text-gray-900">
        <div className="flex items-center gap-2">
          <span>{user.username}</span>
          {displayedRoles.length === 0 && (
            <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
              sin rol
            </span>
          )}
        </div>
      </td>

      <td className="p-4">
        <div className="flex flex-wrap gap-2 mb-2 animate-fade-in">
          {displayedRoles.map((roleLabel, index) => (
            <span
              key={`${user.id}-role-${index}`}
              title={roleLabel}
              className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full shadow-sm"
            >
              {roleLabel}
            </span>
          ))}
        </div>

        <RoleSelect
          selectedRoles={currentRoles}
          originalRoles={originalRoles}
          onChange={(newRoles) => onRoleChange(user.id, newRoles)}
        />
      </td>

      <td className="p-4 text-center">
        {loadingUserId === user.id ? (
          <span className="text-blue-500 animate-pulse text-sm">Guardando...</span>
        ) : (
          <div className="flex justify-center gap-2 flex-wrap">
            {rolesChanged && (
              <>
                <button
                  onClick={() => onSave(user.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs shadow transition-transform hover:scale-105"
                >
                  Guardar
                </button>
                <button
                  onClick={() => onCancel(user.id)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded text-xs shadow"
                >
                  Deshacer
                </button>
              </>
            )}
            <button
              onClick={() => onDelete(user.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs shadow"
            >
              Eliminar
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default UserRow;





