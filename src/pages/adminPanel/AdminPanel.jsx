import React, { useEffect, useState } from "react";
import apiCliente from "../../services/ApiClient";
import RoleSelect from "./RoleSelect";
import { Users, Search } from "lucide-react";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editedRoles, setEditedRoles] = useState({});
  const [message, setMessage] = useState(null);
  const [loadingUserId, setLoadingUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchUsers = async () => {
    try {
      const res = await apiCliente.get("/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (err) {
      console.error("Error al obtener usuarios", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, users]);

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
      await apiCliente.put(
        `/users/${userId}/roles`,
        { roles: rolesToUpdate },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
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

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto p-10 bg-white rounded-3xl shadow-xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <h2 className="text-3xl font-bold text-green-700 flex items-center gap-2">
          <Users className="w-7 h-7" /> Panel de Administración
        </h2>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar usuario..."
            className="border px-3 py-1 rounded w-full md:w-60 text-sm"
          />
        </div>
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
          {currentUsers.map((user) => {
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
                  {loadingUserId === user.id ? (
                    <span className="text-blue-500 animate-pulse text-sm">
                      Guardando...
                    </span>
                  ) : (
                    rolesChanged && (
                      <div className="flex justify-center gap-2">
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
                      </div>
                    )
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-6 flex justify-center items-center gap-2 text-sm">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded-full ${
              page === currentPage
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
