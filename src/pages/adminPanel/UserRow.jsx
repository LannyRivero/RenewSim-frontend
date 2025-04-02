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
      <td className="p-3 font-medium text-gray-900">{user.username}</td>
      <td className="p-3">
        <RoleSelect selectedRoles={currentRoles} onChange={(newRoles) => onRoleChange(user.id, newRoles)} />
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
