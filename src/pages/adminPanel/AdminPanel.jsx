import React, { useEffect, useState } from "react";
import RoleSelect from "../../components/admin/RoleSelect";
import { Users, Trash2 } from "lucide-react";
import {
  getAllUsers,
  updateUserRoles,
  deleteUser,
} from "../../services/UserService";
import UserTable from "../../components/admin/UserTable";
import AdminHeader from "../../components/admin/AdminHeader";
import UserRow from "../../components/admin/UserRow.jsx";


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
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const paginatedUsers = users.slice(startIndex, endIndex);

  const totalPages = Math.ceil(users.length / usersPerPage);
  return (
    <div className="max-w-7xl mx-auto p-10 bg-white rounded-3xl shadow-xl">
      <div className="max-w-7xl mx-auto p-10 bg-white rounded-3xl shadow-xl">
        <AdminHeader message={message} />
        <UserTable
          users={paginatedUsers} // o simplemente users si no usas paginación aún
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
      <div className="flex justify-center mt-6 gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

    </div>
  );
};

export default AdminPanel;
