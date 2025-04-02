import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  updateUserRoles,
  deleteUser,
} from "../../services/UserService";
import AdminHeader from "../../components/admin/AdminHeader";
import UserTable from "../../components/admin/UserTable";
import SearchBar from "../../components/admin/SearchBar";
import Pagination from "../../components/admin/Pagination";
import RoleFilter from "../../components/admin/RoleFilter";
import ConfirmModal from "@/components/admin/ConfirmModal";
import ExportCSVButton from "@/components/admin/ExportCSVButton";


const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [editedRoles, setEditedRoles] = useState({});
  const [message, setMessage] = useState(null);
  const [loadingUserId, setLoadingUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState("ALL");

  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

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

  const handleDeleteUser = (userId) => {
    setUserToDelete(userId);
    setShowModal(true);
  };

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;

    setLoadingUserId(userToDelete);
    try {
      await deleteUser(userToDelete);
      setMessage({ type: "success", text: "Usuario eliminado correctamente" });
      await fetchUsers();
    } catch (error) {
      setMessage({ type: "error", text: "Error al eliminar el usuario" });
    } finally {
      setLoadingUserId(null);
      setUserToDelete(null);
      setShowModal(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const filteredUsers = users
    .filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((user) => {
      if (roleFilter === "ALL") return true;
      return user.roles?.includes(roleFilter);
    });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  return (
    <div className="max-w-7xl mx-auto p-10 bg-white rounded-3xl shadow-xl">
      <AdminHeader message={message} />
      <SearchBar
        searchTerm={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
      />
      <RoleFilter
        selectedRole={roleFilter}
        onChange={(value) => {
          setRoleFilter(value);
          setCurrentPage(1);
        }}
      />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Panel de Administración</h2>
        <ExportCSVButton data={filteredUsers} filename="usuarios.csv" />
      </div>

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

      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDeleteUser}
        message="¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer."
      />
    </div>
  );
};

export default AdminPanel;





