import React, { useEffect, useRef, useState } from "react";
import {
  getAllUsers,
  updateUserRoles,
  deleteUser,
} from "../../services/UserService";
import AdminHeader from "../../components/admin/AdminHeader";
import UserTable from "../../components/admin/UserTable";
import SearchBar from "../../components/admin/SearchBar";
import Pagination from "../../components/admin/Pagination";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [editedRoles, setEditedRoles] = useState({});
  const [message, setMessage] = useState(null);
  const [loadingUserId, setLoadingUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef(null);
  const searchInputRef = useRef(null);

  const usersPerPage = 10;

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      console.log("📦 Usuarios con roles:", data);
      setUsers(data);
    } catch (err) {
      console.error("Error al obtener usuarios", err);
    }
  };

  useEffect(() => {
    fetchUsers();
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
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

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
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
      scrollToTop();
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
      scrollToTop();
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  return (
    <div
      ref={containerRef}
      className="max-w-7xl mx-auto p-10 bg-white rounded-3xl shadow-xl animate-fade-in"
    >
      <AdminHeader message={message} />
      <SearchBar
        searchTerm={searchTerm}
        inputRef={searchInputRef}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
      />
      <UserTable
        users={paginatedUsers}
        editedRoles={editedRoles}
        loadingUserId={loadingUserId}
        onRoleChange={handleRoleChange}
        onSave={saveChanges}
        onCancel={cancelChanges}
        onDelete={handleDeleteUser}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AdminPanel;




