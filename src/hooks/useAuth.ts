import { AppContext } from "@/contexts/AppContextProvider";
import { useContext } from "react";

const useAuth = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAuth must be used within an AppContextProvider");
  }
  return context;
};

export default useAuth;
