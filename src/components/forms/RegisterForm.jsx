
import React from 'react';

const RegisterForm = ({ onRegister }) => {
  return (
    <form
      onSubmit={onRegister}
      className="relative z-10 bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
    >
      <h2 className="text-3xl font-semibold text-center text-gray-800">Create Account</h2>
      <p className="text-center text-sm text-gray-500">
        Fill in the form below to create your account
      </p>

      <div>
        <label htmlFor="name" className="block text-sm mb-1 text-gray-600">Full Name</label>
        <input id="name"
          type="text"
          name="name"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm mb-1 text-gray-600">Email</label>
        <input id="email"
          type="email"
          name="email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="email@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm mb-1 text-gray-600">Password</label>
        <input id="password"
          type="password"
          name="password"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="••••••••"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm mb-1 text-gray-600">Confirm Password</label>
        <input id="confirmPassword"
          type="password"
          name="confirmPassword"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
      >
        Create Account
      </button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{' '}
        <span
          className="text-blue-500 hover:underline cursor-pointer"
          onClick={() => window.location.href = '/login'}
        >
          Login
        </span>
      </p>
    </form>
  );
};

export default RegisterForm;
