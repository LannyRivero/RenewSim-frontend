import React from "react";
import UserRow from "./UserRow.jsx";

const UserTable = ({
  users,
  editedRoles,
  loadingUserId,
  onRoleChange,
  onSave,
  onCancel,
  onDelete,
}) => {
  if (!users || users.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-8 text-sm animate-fade-in">
        No hay usuarios para mostrar.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto shadow rounded-lg border border-gray-200 animate-fade-in">
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left bg-white rounded-lg">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs sticky top-0 z-10">
          <tr>
            <th className="p-4">Usuario</th>
            <th className="p-4">Roles</th>
            <th className="p-4 text-center">Acción</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const originalRoles = (user.roles || []).map((r) => r.toUpperCase()).sort();
            const currentRoles = (editedRoles[user.id] || originalRoles).map(r => r.toUpperCase()).sort();

            return (
              <UserRow
                key={user.id}
                user={user}
                currentRoles={currentRoles}
                originalRoles={originalRoles}
                loadingUserId={loadingUserId}
                onRoleChange={onRoleChange}
                onSave={onSave}
                onCancel={onCancel}
                onDelete={onDelete}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

