import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthProvider } from "./AuthContext";
import { RegistrationType } from "../Types/User.type";
import { USER_STORAGE_KEY } from "./StorageConstant";
import { useNavigate } from "react-router-dom";

export const Auth = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<RegistrationType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const navigate = useNavigate();

  const removeCredentials = () => {
    navigate("/login");
    sessionStorage.removeItem("isLoggedIn");
    setIsAuthenticated(false);
  };

  const getUserDetails = useCallback(() => {
    try {
      // Getting the UserDetails from local storage
      const loggedUser = localStorage.getItem(USER_STORAGE_KEY);

      if (loggedUser) {
        const parsedUserData = JSON.parse(loggedUser);
        setUser(parsedUserData);
        setIsAuthenticated(true);
      } else {
        throw new Error("No user details found");
      }
    } catch (error) {
      console.error(error);
      removeCredentials();
    }
  }, [setUser, setIsAuthenticated]);

  const logout = useCallback(() => {
    removeCredentials();
  }, [setIsAuthenticated]);

  const login = useCallback(() => {
    sessionStorage.setItem("isLoggedIn", "LOGGED_IN");
    // set authentication as true
    setIsAuthenticated(true);
  }, [setIsAuthenticated]);

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  const values = useMemo(() => {
    return {
      user,
      isAuthenticated,
      login,
      logout,
    };
  }, [user, isAuthenticated, login, logout]);

  return <AuthProvider value={values}>{children}</AuthProvider>;
};
