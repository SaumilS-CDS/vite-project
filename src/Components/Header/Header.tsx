import { FC } from "react";
import Navbar from "../Navbar/Navbar";

import css from "./Header.module.css";
import { Button } from "@mui/material";
import { useAuth } from "../../Core/AuthContext";
import { useNavigate } from "react-router-dom";

export const Header: FC = () => {
  const { logout } = useAuth();

  const navigate = useNavigate();

  return (
    <div className={css.header}>
      <Navbar />

      <Button
        variant="outlined"
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        LogOut
      </Button>
    </div>
  );
};
