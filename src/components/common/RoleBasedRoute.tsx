import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { Progress } from "../ui/progress";

type UserRole = "SUPER_USER" | "ADMIN" | "USER";

interface RoleBasedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
  fallback?: string;
  requireAuth?: boolean;
}

const RoleBasedRoute = ({
  children,
  allowedRoles = [],
  fallback = "/auth/sign-in",
  requireAuth = true,
}: RoleBasedRouteProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  console.log("=== RoleBasedRoute Debug ===");
  console.log("Props:", { allowedRoles, fallback, requireAuth });
  console.log("Auth State:", { isLoading, user });
  console.log("Current Location:", location.pathname);

  if (isLoading) {
    console.log("Loading auth state, showing spinner...");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-1/3 max-w-sm">
          <Progress value={33} className="w-full" />
        </div>
      </div>
    );
  }

  if (requireAuth && !user) {
    console.log("No user found, redirecting to fallback:", fallback);
    return <Navigate to={fallback} state={{ from: location }} replace />;
  }

  if (allowedRoles.length && user) {
    console.log("Checking role access...");
    console.log("Allowed roles:", allowedRoles);
    console.log("User role:", user.role);

    if (!allowedRoles.includes(user.role as UserRole)) {
      const redirectPath = getRoleBasedRedirect(user.role as UserRole);
      console.log(
        `Role not allowed. Redirecting '${user.role}' to '${redirectPath}'`
      );
      return <Navigate to={redirectPath} replace />;
    } else {
      console.log("Role is allowed, rendering children.");
    }
  }

  console.log("Rendering children.");
  return <>{children}</>;
};

export const getRoleBasedRedirect = (userRole: UserRole): string => {
  switch (userRole) {
    case "SUPER_USER":
      return "/dashboard/super-user";
    case "ADMIN":
      return "/dashboard/admin";
    case "USER":
      return "/dashboard/user";
    default:
      return "/dashboard/user";
  }
};

export default RoleBasedRoute;
