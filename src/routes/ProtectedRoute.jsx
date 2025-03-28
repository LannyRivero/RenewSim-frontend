import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * Componente para proteger rutas según autenticación y roles permitidos
 */
const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useContext(AuthContext);

  // Si no está autenticado
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Extrae los roles (adaptado según cómo guardes el usuario)
  const userRoles = Array.isArray(user.roles)
    ? user.roles.map(role => typeof role === 'string' ? role : role.name)
    : [user.role]; // fallback si solo hay un rol

  // Si tiene al menos un rol permitido
  const hasAccess = allowedRoles.some(role => userRoles.includes(role));

  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

