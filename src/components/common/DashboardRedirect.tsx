import useAuth from "@/hooks/useAuth";
import { Navigate } from "react-router";

export default function DashboardRedirect() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  switch (user.role) {
    case "SUPER_USER":
      return <Navigate to="/dashboard/super-user" replace />;
    case "ADMIN":
      return <Navigate to="/dashboard/admin" replace />;
    case "USER":
    default:
      return <Navigate to="/dashboard/user" replace />;
  }
}
