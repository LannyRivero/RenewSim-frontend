import React, { useState } from "react";
import { toast } from "react-hot-toast";
import apiCliente from "@/services/ApiClient";
import { useAuth } from "@/context/AuthContext";

const ChangePasswordForm = () => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("❌ Las nuevas contraseñas no coinciden");
      return;
    }

    try {
      await apiCliente.put('/users/change-password', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });


      toast.success("✅ Contraseña cambiada correctamente");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("❌ Error al cambiar la contraseña");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/50 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-300 space-y-4 animate-fade-in-down"
    >
      <h3 className="text-lg font-semibold text-gray-800">Cambiar contraseña</h3>

      <div>
        <label className="block mb-1 font-medium">Contraseña actual</label>
        <input
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Nueva contraseña</label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Confirmar nueva contraseña</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
      >
        Guardar cambios
      </button>
    </form>
  );
};

export default ChangePasswordForm;

