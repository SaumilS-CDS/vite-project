import { useState } from "react";
import { NavLink } from "react-router-dom";

import classNames from "classnames";
import css from "./Navbar.module.css";

const Navbar = () => {
  const [selectedTab, setSelectedTab] = useState<string>("home");

  return (
    <div className={css.menuIcon}>
      <ul className={css["navbar-list"]}>
        <li>
          <NavLink
            className={classNames(css["navbar-link"], {
              [css.active]: selectedTab === "home",
            })}
            onClick={() => setSelectedTab("home")}
            to="/"
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            className={classNames(css["navbar-link"], {
              [css.active]: selectedTab === "about",
            })}
            onClick={() => setSelectedTab("about")}
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
