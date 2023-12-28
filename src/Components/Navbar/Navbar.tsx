import { useState } from "react";
import { NavLink } from "react-router-dom";

import classNames from "classnames";
import css from "./Navbar.module.css";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <div className={classNames(css.menuIcon, { [css.active]: openMenu })}>
      <ul className={css["navbar-list"]}>
        <li>
          <NavLink
            className={css["navbar-link"]}
            onClick={() => setOpenMenu(false)}
            to="/"
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            className={css["navbar-link"]}
            onClick={() => setOpenMenu(false)}
            to="/about"
          >
            About
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
