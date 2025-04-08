import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { loginUser } from '@/services/authService';
import backgroundImage from '@/assets/generacion-eolica.jpg';

const LoginForm = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth(); 


  useEffect(() => {
    if (user) {
      if (user.roles.includes("ADMIN")) {
        navigate("/dashboard/admin/users");
      } else if (user.roles.includes("ADVANCED_USER")) {
        navigate("/dashboard/advanced");
      } else {
        navigate("/dashboard/user");
      }
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const credentials = {
      username: form.username.value,
      password: form.password.value,
    };

    try {
      const { token, username, roles } = await loginUser(credentials);
      console.log("🚀 Login response:", { token, username, roles });

      // Guardar el usuario en el contexto de autenticación
      login(token, { username, roles });

      // Redirigir según el rol
      if (roles.includes("ADMIN")) {
        navigate("/dashboard/admin/users");
      } else if (roles.includes("ADVANCED_USER")) {
        navigate("/dashboard/advanced");
      } else {
        navigate("/dashboard/user");
      }
    } catch (error) {
      alert('Credenciales incorrectas o error del servidor.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
    
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      <div className="absolute inset-0 bg-black opacity-40"></div>

      <form
        onSubmit={handleLogin}
        className="relative z-10 bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800">Welcome Back</h2>
        <p className="text-center text-sm text-gray-500">
          Please enter your email and password to continue
        </p>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Email address:</label>
          <input
            type="email"
            name="username"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@email.com"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm text-gray-600">Password</label>
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>
          <input
            type="password"
            name="password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>

        <div className="flex items-center">
          <input type="checkbox" id="remember" className="mr-2" />
          <label htmlFor="remember" className="text-sm text-gray-600">Remember Password</label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
        >
          Login to Account
        </button>

        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{' '}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate('/register')}
          >
            Create Account
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;






