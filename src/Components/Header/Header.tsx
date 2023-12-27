import { FC } from "react";
import Navbar from "../Navbar/Navbar";

import "./Header.css";

export const Header: FC = () => {
  return (
    <div className="header">
      <Navbar />
      <div className="userLogo">AA</div>
    </div>
  );
};
