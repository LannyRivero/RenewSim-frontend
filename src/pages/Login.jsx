import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import LoginForm from '../components/forms/LoginForm';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();

  // ✅ Si ya hay usuario logueado, redirige
  if (user) {
    return <Navigate to="/simulation" />;
  }

  const handleLogin = async (credentials) => {
    try {
      const { token, user } = await loginUser(credentials);
      login(token, user);
      navigate('/simulation');
    } catch (error) {
      alert('Credenciales incorrectas o error del servidor.');
    }
  };

  return <LoginForm onLogin={handleLogin} />;
};

export default Login;


