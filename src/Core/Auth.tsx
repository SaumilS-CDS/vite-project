import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthProvider } from "./AuthContext";

export const Auth = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const getUserDetails = useCallback(() => {
    setIsLoading(true);
    try {
      // Getting the UserDetails from localstorage
      const loggedUser = JSON.parse(localStorage.getItem("UserDetails") || "");
      setUser(loggedUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem("isLoggedIn");
  }, []);

  const login = useCallback(() => {
    sessionStorage.setItem("isLoggedIn", "LOGGED_IN");
  }, []);

  useEffect(() => {
    getUserDetails();
  }, [user]);

  const values = useMemo(() => {
    return {
      user,
      isLoading,
      isAuthenticated,
      login,
      logout,
    };
  }, []);

  return <AuthProvider value={values}>{children}</AuthProvider>;
};
