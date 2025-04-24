import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  updateUserRoles,
  deleteUser,
} from "@/services/UserService";
import UserTable from "@/components/admin/UserTable";
import SearchBar from "@/components/admin/SearchBar";
import RoleFilter from "@/components/admin/RoleFilter";
import Pagination from "@/components/admin/Pagination";
import ExportCSVButton from "@/components/common/ExportCSVButton";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [editedRoles, setEditedRoles] = useState({});
  const [loadingUserId, setLoadingUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [showUserDeleteModal, setShowUserDeleteModal] = useState(false);
  const [selectedUserToDelete, setSelectedUserToDelete] = useState(null);

  const usersPerPage = 10;

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
      toast.success("✅ Roles actualizados correctamente");
      setEditedRoles((prev) => {
        const updated = { ...prev };
        delete updated[userId];
        return updated;
      });
      await fetchUsers();
    } catch (err) {
      toast.error("❌ Error al actualizar roles");
    } finally {
      setLoadingUserId(null);
    }
  };

  const handleDeleteUser = (userId, username) => {
    setSelectedUserToDelete({ id: userId, username });
    setShowUserDeleteModal(true);
  };

  // 🔁 Confirmación desde el modal
  const confirmUserDeletion = async () => {
    if (!selectedUserToDelete) return;
    setLoadingUserId(selectedUserToDelete.id);

    try {
      await deleteUser(selectedUserToDelete.id);
      toast.success("✅ Usuario eliminado correctamente");
      await fetchUsers();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      toast.error("❌ No se pudo eliminar el usuario");
    } finally {
      setLoadingUserId(null);
      setShowUserDeleteModal(false);
      setSelectedUserToDelete(null);
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
        isOpen={showUserDeleteModal}
        title="Eliminar usuario"
        description={`¿Estás seguro de que deseas eliminar al usuario "${selectedUserToDelete?.username}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        onClose={() => {
          setShowUserDeleteModal(false);
          setSelectedUserToDelete(null);
        }}
        onConfirm={confirmUserDeletion}
      />
    </div>
  );
};

export default AdminDashboard;
