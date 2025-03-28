import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * Rutas protegidas por autenticación y rol
 * @param {string[]} allowedRoles - Roles que pueden acceder (ej. ['ADMIN'])
 */
const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

