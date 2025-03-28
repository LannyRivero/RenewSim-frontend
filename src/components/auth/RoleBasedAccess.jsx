import { useAuth } from "../../context/AuthContext";

/**
 * Renderiza los children solo si el usuario tiene uno de los roles permitidos. */


const RoleBasedAccess = ({ allowedRoles, children }) => {
  const { user } = useAuth();
  if (!user || !allowedRoles.includes(user.role)) return null;
  return <>{children}</>;
};

export default RoleBasedAccess;

