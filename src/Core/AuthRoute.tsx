import { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export const AuthRoute = () => {
  const { isLoading, isAuthenticated } = useAuth();

  const token = sessionStorage.getItem("isLoggedIn");

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    } else {
      navigate("/login")
    }
  }, []);

  if (!isAuthenticated && !isLoading && !token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
