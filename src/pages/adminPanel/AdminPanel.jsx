import React, { useEffect, useState } from "react";
import RoleSelect from "../../components/admin/RoleSelect";
import { Users, Trash2 } from "lucide-react";
import {
  getAllUsers,
  updateUserRoles,
  deleteUser,
} from "../../services/UserService";
import UserRow from "../../components/admin/UserRow";
import AdminHeader from "../../components/admin/AdminHeader";


const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [editedRoles, setEditedRoles] = useState({});
  const [message, setMessage] = useState(null);
  const [loadingUserId, setLoadingUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error al obtener usuarios", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = (userId, newRoles) => {
    setEditedRoles((prev) => ({ ...prev, [userId]: newRoles }));
  };

  const cancelChanges = (userId) => {
    setEditedRoles((prev) => {
      const updated = { ...prev };
      delete updated[userId];
      return updated;
    });
  };

  const saveChanges = async (userId) => {
    const rolesToUpdate = editedRoles[userId];
    if (!rolesToUpdate) return;

    setLoadingUserId(userId);
    try {
      await updateUserRoles(userId, rolesToUpdate);
      setMessage({ type: "success", text: "Roles actualizados correctamente" });
      setEditedRoles((prev) => {
        const updated = { ...prev };
        delete updated[userId];
        return updated;
      });
      await fetchUsers();
    } catch (err) {
      setMessage({ type: "error", text: "Error al actualizar roles" });
    } finally {
      setLoadingUserId(null);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (!confirmDelete) return;

    setLoadingUserId(userId);
    try {
      await deleteUser(userId);
      setMessage({ type: "success", text: "Usuario eliminado correctamente" });
      await fetchUsers();
    } catch (error) {
      setMessage({ type: "error", text: "Error al eliminar el usuario" });
    } finally {
      setLoadingUserId(null);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-10 bg-white rounded-3xl shadow-xl">
      <div className="max-w-7xl mx-auto p-10 bg-white rounded-3xl shadow-xl">
        <AdminHeader message={message} />
        <UserTable
          users={users}
          editedRoles={editedRoles}
          loadingUserId={loadingUserId}
          onRoleChange={handleRoleChange}
          onSave={saveChanges}
          onCancel={cancelChanges}
          onDelete={handleDeleteUser}
        />
      </div>

      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-100 uppercase tracking-wider text-gray-600">
          <tr>
            <th className="p-3 text-left">Usuario</th>
            <th className="p-3 text-left">Roles</th>
            <th className="p-3 text-center">Acción</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => {
            const originalRoles = user.roles.map((r) => r.name).sort();
            const currentRoles = (editedRoles[user.id] || originalRoles).sort();

            return (
              <UserRow
                key={user.id}
                user={user}
                currentRoles={currentRoles}
                originalRoles={originalRoles}
                loadingUserId={loadingUserId}
                onRoleChange={handleRoleChange}
                onSave={saveChanges}
                onCancel={cancelChanges}
                onDelete={handleDeleteUser}
              />
            );
          })}
        </tbody>

      </table>
    </div>
  );
};

export default AdminPanel;
