import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
    <h1 className="text-4xl font-bold text-red-600 mb-4">⛔ Acceso Denegado</h1>
    <p className="text-lg text-gray-700 mb-6">
      No tienes permisos para acceder a esta página.
    </p>
    <Link
      to="/"
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Volver al inicio
    </Link>
  </div>
);

export default Unauthorized;
