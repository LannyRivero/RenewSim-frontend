
import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(credentials);
  };

  return (
    <form className="max-w-md mx-auto p-6 shadow-md rounded-xl bg-white" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4 text-center">Iniciar sesión</h2>

      <input type="text" name="username" placeholder="Usuario"
        className="w-full p-2 mb-4 border rounded-lg"
        onChange={handleChange} required />

      <input type="password" name="password" placeholder="Contraseña"
        className="w-full p-2 mb-4 border rounded-lg"
        onChange={handleChange} required />

      <button type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200">
        Iniciar sesión
      </button>
    </form>
  );
};

export default LoginForm;
