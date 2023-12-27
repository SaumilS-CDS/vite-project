import { useState } from "react";
import { NavLink } from "react-router-dom";

import classNames from "classnames";
import "./Navbar.css";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <div className={classNames("menuIcon", { active: openMenu })}>
      <ul className="navbar-list">
        <li>
          <NavLink
            className="navbar-link"
            onClick={() => setOpenMenu(false)}
            to="/"
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            className="navbar-link"
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
