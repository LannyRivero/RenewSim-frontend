import React, { useEffect, useState } from "react";
import axios from "axios";
import RoleSelect from "./RoleSelect";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(null);
  const [loadingUserId, setLoadingUserId] = useState(null); // opcional

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

  const handleRoleChange = async (userId, selectedRoles) => {
    setLoadingUserId(userId); // muestra loading
    try {
      await axios.put(`/api/v1/users/${userId}/roles`, {
        roles: selectedRoles,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMessage({ type: "success", text: "Roles actualizados correctamente" });
      await fetchUsers(); // 🔄 recarga la lista
    } catch (err) {
      setMessage({ type: "error", text: "Error al actualizar roles" });
    } finally {
      setLoadingUserId(null); // quita loading
      setTimeout(() => setMessage(null), 3000); // borra snackbar tras 3s
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Panel de Administración</h2>

      {/* Snackbar feedback */}
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
          {users.map(user => (
            <tr key={user.id} className="border-t">
              <td className="p-2">{user.username}</td>
              <td className="p-2">
                <RoleSelect
                  selectedRoles={user.roles.map(r => r.name)}
                  onChange={(newRoles) => handleRoleChange(user.id, newRoles)}
                />
              </td>
              <td className="p-2 text-center">
                {loadingUserId === user.id && (
                  <span className="text-blue-500 animate-pulse text-sm">Actualizando...</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;

