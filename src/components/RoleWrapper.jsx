// componente para ocultar o mostrar secciones según el rol:

import React from 'react';
import useRole from '../hooks/useRole';

/**
 * Componente que muestra sus hijos solo si el usuario tiene alguno de los roles permitidos.
 * @param {Array<string>} allowedRoles - Lista de roles autorizados (ej. ['ADMIN', 'ADVANCED_USER'])
 * @param {React.ReactNode} children - Elementos que se mostrarán si el rol coincide
 */
const RoleWrapper = ({ allowedRoles, children }) => {
  const hasPermission = useRole(allowedRoles);
  return hasPermission ? children : null;
};

export default RoleWrapper;

