import { useAuth } from "@/context/AuthContext";

const RoleBasedAccess = ({ allowedRoles, children }) => {
  const { user } = useAuth();
  if (!user || !allowedRoles.includes(user.role)) return null;
  return <>{children}</>;
};

export default RoleBasedAccess;

