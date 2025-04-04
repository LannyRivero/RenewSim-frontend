import apiCliente from "./ApiClient";

export const getAllUsers = async () => {
  const response = await apiCliente.get("/users");
  return response.data;
};

export const updateUserRoles = async (userId, roles) => {
  const response = await apiCliente.put(`/users/${userId}/roles`, { roles });
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await apiCliente.delete(`/users/${userId}`);
  return response.data;
};