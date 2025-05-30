import React from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '@/services/AuthService';
import backgroundImage from '@/assets/generacion-eolica.jpg';
import RegisterForm from '@/components/forms/RegisterForm';
import { useAuth } from '@/context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;

    const userData = {
      username: form.email.value,
      password: form.password.value,
    };

    try {
      await registerUser(userData);

      const { token, username, roles } = await loginUser(userData);
      login(token, { username, roles });

      if (roles.includes("ADMIN")) {
        navigate("/dashboard/admin/users");
      } else if (roles.includes("ADVANCED_USER")) {
        navigate("/dashboard/advanced");
      } else {
        navigate("/dashboard/user");
      }

    } catch (error) {
      console.error("❌ Error al registrar:", error);
      alert('Error al registrar. Verifica los datos o inténtalo más tarde.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <RegisterForm onRegister={handleRegister} />
    </div>
  );
};

export default Register;

