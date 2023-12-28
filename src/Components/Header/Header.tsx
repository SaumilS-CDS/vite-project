import { FC } from "react";
import Navbar from "../Navbar/Navbar";

import css from "./Header.module.css";

export const Header: FC = () => {
  return (
    <div className={css.header}>
      <Navbar />
      <div className={css.userLogo}>AA</div>
    </div>
  );
};
