import React, { useEffect, useState } from "react";
import axios from "axios";
import RoleSelect from "./RoleSelect";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [editedRoles, setEditedRoles] = useState({});
  const [message, setMessage] = useState(null);
  const [loadingUserId, setLoadingUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/v1/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error al obtener usuarios", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = (userId, newRoles) => {
    setEditedRoles(prev => ({ ...prev, [userId]: newRoles }));
  };

  const cancelChanges = (userId) => {
    setEditedRoles(prev => {
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
      await axios.put(`/api/v1/users/${userId}/roles`, { roles: rolesToUpdate }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMessage({ type: "success", text: "Roles actualizados correctamente" });
      setEditedRoles(prev => {
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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Panel de Administración</h2>

      {message && (
        <div className={`mb-4 px-4 py-2 rounded text-white ${message.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {message.text}
        </div>
      )}

      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Usuario</th>
            <th className="p-2 text-left">Roles</th>
            <th className="p-2 text-center">Acción</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            const originalRoles = user.roles.map(r => r.name).sort();
            const currentRoles = (editedRoles[user.id] || originalRoles).sort();
            const rolesChanged = JSON.stringify(originalRoles) !== JSON.stringify(currentRoles);

            return (
              <tr key={user.id} className="border-t">
                <td className="p-2">{user.username}</td>
                <td className="p-2">
                  <RoleSelect
                    selectedRoles={currentRoles}
                    onChange={(newRoles) => handleRoleChange(user.id, newRoles)}
                  />
                </td>
                <td className="p-2 text-center flex gap-2 justify-center">
                  {loadingUserId === user.id ? (
                    <span className="text-blue-500 animate-pulse text-sm">Guardando...</span>
                  ) : (
                    rolesChanged && (
                      <>
                        <button
                          onClick={() => saveChanges(user.id)}
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={() => cancelChanges(user.id)}
                          className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400 text-sm"
                        >
                          Deshacer
                        </button>
                      </>
                    )
                  )}
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


