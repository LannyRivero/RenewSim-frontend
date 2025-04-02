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
    return <p className="text-center text-gray-500 mt-4">No hay usuarios para mostrar.</p>;
  }

  return (
    <table className="min-w-full divide-y divide-gray-200 text-sm">
      <thead className="bg-gray-100 uppercase tracking-wider text-gray-600">
        <tr>
          <th className="p-3 text-left">Usuario</th>
          <th className="p-3 text-left">Roles</th>
          <th className="p-3 text-center">Acción</th>
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
  );
};

export default UserTable;
