
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/AuthService';
import backgroundImage from '../assets/generacion-eolica.jpg';
import RegisterForm from '../components/forms/RegisterForm';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newUser = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      confirmPassword: form.confirmPassword.value,
    };

    if (newUser.password !== newUser.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await registerUser(newUser);
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      navigate('/login');
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
