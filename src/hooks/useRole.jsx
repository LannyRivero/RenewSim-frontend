import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useRole = (allowedRoles = []) => {
  const { user } = useContext(AuthContext);

  if (!user || !user.role) return false;

  return allowedRoles.includes(user.role);
};

export default useRole;
