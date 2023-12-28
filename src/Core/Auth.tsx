import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthProvider } from "./AuthContext";
import { RegistrationType } from "../Types/User.type";

export const Auth = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<RegistrationType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const getUserDetails = useCallback(() => {
    setIsLoading(true);
    try {
      // Getting the UserDetails from local storage
      const loggedUser = JSON.parse(localStorage.getItem("UserDetails") || "");
      setUser(loggedUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setUser, setIsAuthenticated]);

  const logout = useCallback(() => {
    sessionStorage.removeItem("isLoggedIn");
  }, []);

  const login = useCallback(() => {
    sessionStorage.setItem("isLoggedIn", "LOGGED_IN");
  }, []);

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  const values = useMemo(() => {
    return {
      user,
      isLoading,
      isAuthenticated,
      login,
      logout,
    };
  }, [user, isLoading, isAuthenticated, login, logout]);

  return <AuthProvider value={values}>{children}</AuthProvider>;
};
