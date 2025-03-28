import React, { useEffect, useState } from "react";
import axios from "axios";
import RoleSelect from "./RoleSelect";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/v1/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(res => setUsers(res.data));
  }, []);

  const handleRoleChange = (userId, selectedRoles) => {
    axios.put(`/api/v1/users/${userId}/roles`, {
      roles: selectedRoles,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(() => {
      alert("Roles actualizados");
    }).catch(() => {
      alert("Error al actualizar roles");
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Panel de Administración</h2>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Usuario</th>
            <th className="p-2 text-left">Roles</th>
            <th className="p-2">Acción</th>
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
                {/* Podrías añadir botón guardar si no quieres autoguardar al cambiar */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
