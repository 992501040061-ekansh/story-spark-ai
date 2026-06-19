import { type ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getUserInfo, isLoggedIn } from "../services/auth.service";

interface ProtectedRouteProps {
  children?: ReactNode;
  allowedRoles?: string[];
}

/**
 * ProtectedRoute Component
 * Guards a route by verifying the stored token is present, decodable,
 * and checks the user's role if allowedRoles is provided.
 */
export const hasAllowedRole = (userRole: string, allowedRoles?: string[]) => {
  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }

  return allowedRoles.includes(userRole);
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const location = useLocation();

  if (!isLoggedIn()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const user = getUserInfo();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!hasAllowedRole(user.role, allowedRoles)) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
