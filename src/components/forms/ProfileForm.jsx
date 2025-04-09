import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useProfile from "@/hooks/useProfile";
import InputFieldWithHint from "@/components/common/inputField/InputFieldWithHint";
import PrimaryButton from "@/components/common/button/PrimaryButton";
import ErrorToast from "@/components/common/ErrorToast";

const ProfileForm = () => {
  const { profile, updateProfileData, loading } = useProfile();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

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
    if (!validate()) return;

    try {
      await updateProfileData(formData);
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage(
        error.response?.data?.message || "Ocurrió un error inesperado al actualizar el perfil."
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
      />

      <div className="text-center pt-4">
        <PrimaryButton type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar cambios"}
        </PrimaryButton>
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

