
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import backgroundImage from '../assets/generacion-eolica.jpg';
import RegisterForm from '../components/forms/RegisterForm';
import { useAuth } from '../context/AuthContext'; // ✅ Añadir esto

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Obtenemos la función login del contexto

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
  
    const userData = {
      username: form.email.value,
      password: form.password.value,
    };
  
    try {
      const { token } = await registerUser(userData);
      login(token); // Guarda el token en el contexto
      navigate('/');
    } catch (error) {
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
