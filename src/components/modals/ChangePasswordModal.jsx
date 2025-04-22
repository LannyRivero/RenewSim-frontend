import React from "react";
import ModalBase from "@/components/modals/ModalBase";
import ChangePasswordForm from "@/components/forms/ChangePasswordForm";

const ChangePasswordModal = ({ isOpen, onClose }) => {
  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Cambiar contraseña">
      <ChangePasswordForm />
    </ModalBase>
  );
};

export default ChangePasswordModal;

