import React from "react";
import RoleSelect from "./RoleSelect";

const UserRow = ({
  user,
  currentRoles,
  originalRoles,
  loadingUserId,
  onRoleChange,
  onSave,
  onCancel,
  onDelete,
}) => {
  const rolesChanged = JSON.stringify(originalRoles) !== JSON.stringify(currentRoles);

  return (
    <tr className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition">
      <td className="p-3 font-medium text-gray-900">
        <div className="flex flex-col">
          <span>{user.username}</span>

          {/* Visualización de roles actuales */}
          <div className="flex gap-1 mt-1">
  {user.roles?.map((role, index) => {
    const roleName = role?.name || "UNKNOWN";
    const roleLabel = roleName.replace("_", " ").toLowerCase();
    const badgeColor =
      roleName === "ADMIN"
        ? "bg-red-100 text-red-700"
        : roleName === "ADVANCED_USER"
        ? "bg-blue-100 text-blue-700"
        : roleName === "USER"
        ? "bg-green-100 text-green-700"
        : "bg-gray-200 text-gray-600";

    return (
      <span
        key={index}
        className={`text-xs px-2 py-0.5 rounded-full font-semibold ${badgeColor}`}
      >
        {roleLabel}
      </span>
    );
  })}
</div>
        </div>
      </td>

      <td className="p-3">
        <RoleSelect
          selectedRoles={currentRoles}
          onChange={(newRoles) => onRoleChange(user.id, newRoles)}
        />
      </td>

      <td className="p-3 text-center">
        {loadingUserId === user.id ? (
          <span className="text-blue-500 animate-pulse text-sm">Guardando...</span>
        ) : (
          <div className="flex justify-center gap-2 flex-wrap">
            {rolesChanged && (
              <>
                <button
                  onClick={() => onSave(user.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                >
                  Guardar
                </button>
                <button
                  onClick={() => onCancel(user.id)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded text-sm"
                >
                  Deshacer
                </button>
              </>
            )}
            <button
              onClick={() => onDelete(user.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
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

