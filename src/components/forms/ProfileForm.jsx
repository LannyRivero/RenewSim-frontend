import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useProfile from "@/hooks/useProfile";
import { deleteProfile } from "@/services/ProfileService";
import InputFieldWithHint from "@/components/common/inputField/InputFieldWithHint";
import PrimaryButton from "@/components/common/button/PrimaryButton";
import ErrorToast from "@/components/common/ErrorToast";

const ProfileForm = () => {
  const { profile, updateProfileData, loading } = useProfile();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
        phone: profile.phone || ""
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "El nombre es obligatorio.";
    if (!formData.lastName.trim()) newErrors.lastName = "Los apellidos son obligatorios.";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Introduce un email válido.";
    if (!formData.phone.trim() || formData.phone.length < 7)
      newErrors.phone = "Introduce un teléfono válido.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    if (!validate()) return;

    try {
      await updateProfileData(formData);
      setSuccessMessage("✅ Perfil actualizado con éxito.");
      setErrors({});
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage(
        error.response?.data?.message || "Ocurrió un error inesperado al actualizar el perfil."
      );
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteProfile();
      alert("Perfil eliminado con éxito.");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting profile:", error);
      setErrorMessage(
        error.response?.data?.message || "Ocurrió un error inesperado al eliminar el perfil."
      );
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
            className="text-green-600 text-sm font-medium"
          >
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <InputFieldWithHint
        label="Nombre"
        name="firstName"
        type="text"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="Tu nombre"
        error={errors.firstName}
        icon="👤"
        title="Introduce tu nombre."
        disabled={loading}
      />

      <InputFieldWithHint
        label="Apellidos"
        name="lastName"
        type="text"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Tus apellidos"
        error={errors.lastName}
        icon="👥"
        title="Introduce tus apellidos."
        disabled={loading}
      />

      <InputFieldWithHint
        label="Correo electrónico"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="tucorreo@example.com"
        error={errors.email}
        icon="📧"
        title="Introduce tu email."
        disabled={loading}
      />

      <InputFieldWithHint
        label="Teléfono"
        name="phone"
        type="text"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Ej. 600123456"
        error={errors.phone}
        icon="📞"
        title="Introduce tu número de teléfono."
        disabled={loading}
      />

      <div className="text-center pt-4">
        <PrimaryButton type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar cambios"}
        </PrimaryButton>
      </div>

      <div className="text-center pt-2">
        <button
          type="button"
          onClick={handleConfirmDelete}
          className="text-red-600 hover:text-red-800 transition duration-300 text-sm"
        >
          Eliminar perfil
        </button>
      </div>

      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <ErrorToast message={errorMessage} onClose={() => setErrorMessage("")} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
};

export default ProfileForm;




