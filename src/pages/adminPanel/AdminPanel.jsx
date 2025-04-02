import React, { useEffect, useState } from "react";
import RoleSelect from "./RoleSelect";
import { Users, Trash2 } from "lucide-react";
import {
  getAllUsers,
  updateUserRoles,
  deleteUser,
} from "../../services/UserService";

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

  const handleDelete = async (userId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      try {
        await deleteUser(userId);
        setMessage({ type: "success", text: "Usuario eliminado correctamente" });
        await fetchUsers();
      } catch (err) {
        setMessage({ type: "error", text: "Error al eliminar usuario" });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-10 bg-white rounded-3xl shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-green-700 flex items-center gap-2">
          <Users className="w-7 h-7" /> Panel de Administración
        </h2>
        {message && (
          <span
            className={`text-sm px-4 py-2 rounded-full ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </span>
        )}
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
          {users.map((user) => {
            const originalRoles = user.roles.map((r) => r.name).sort();
            const currentRoles = (editedRoles[user.id] || originalRoles).sort();
            const rolesChanged =
              JSON.stringify(originalRoles) !== JSON.stringify(currentRoles);

            return (
              <tr
                key={user.id}
                className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
              >
                <td className="p-3 font-medium text-gray-900">{user.username}</td>
                <td className="p-3">
                  <RoleSelect
                    selectedRoles={currentRoles}
                    onChange={(newRoles) => handleRoleChange(user.id, newRoles)}
                  />
                </td>
                <td className="p-3 text-center">
                  <div className="flex justify-center gap-2">
                    {loadingUserId === user.id ? (
                      <span className="text-blue-500 animate-pulse text-sm">
                        Guardando...
                      </span>
                    ) : (
                      rolesChanged && (
                        <>
                          <button
                            onClick={() => saveChanges(user.id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                          >
                            Guardar
                          </button>
                          <button
                            onClick={() => cancelChanges(user.id)}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded"
                          >
                            Deshacer
                          </button>
                        </>
                      )
                    )}
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                      title="Eliminar usuario"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
