import RoleBasedRoute, {
  getRoleBasedRedirect,
} from "@/components/common/RoleBasedRoute";
import ApiClient from "@/lib/axios";
import { createContext, useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";

type User = {
  name: string;
  email: string;
  organization: string;
  role: "ADMIN" | "SUPER_USER" | "USER";
};

interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
}

export const AppContext = createContext<AppContextType>({
  user: null,
  setUser: () => {},
  isLoading: false,
});

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log(user, "loggedin");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const response = await ApiClient.get("/auth/verify");
        console.log(response, "veriR");

        if (response?.data?.success) {
          setUser(response?.data?.data);
          // const roleBasedRedirect = getRoleBasedRedirect(user?.role!);
          // navigate(roleBasedRedirect);
        } else {
          setUser(null);
          navigate("/auth/sign-in");
        }
      } catch (err) {
        console.error("Token verification failed", err);
        setUser(null);
        navigate("/auth/sign-in");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <AppContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
