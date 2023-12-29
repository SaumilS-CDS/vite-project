import { FC, useState } from "react";
import Navbar from "../Navbar/Navbar";

import css from "./Header.module.css";
import { Button } from "@mui/material";
import { useAuth } from "../../Core/AuthContext";
import { useNavigate } from "react-router-dom";
import { BookModal } from "../BookModal/BookModal";

export const Header: FC = () => {
  const { logout } = useAuth();

  const navigate = useNavigate();

  const [isOpenSaveBookModal, setIsOpenSaveBookModal] =
    useState<boolean>(false);

  return (
    <div className={css.header}>
      <Navbar />

      <div className={css.actions}>
        <Button
          variant="contained"
          onClick={() => setIsOpenSaveBookModal(true)}
        >
          Add New Book
        </Button>
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

      <BookModal
        isOpenModal={isOpenSaveBookModal}
        changedIsOpenModal={() => setIsOpenSaveBookModal((prev) => !prev)}
      />
    </div>
  );
};
