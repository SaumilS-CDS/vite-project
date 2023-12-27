import "./Registration.css";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { NavLink } from "react-router-dom";

export const Registration = () => {
  return (
    <div className="container">
      <div className="background-image" />
      <div className="wrapper">
        <form action="">
          <h2>Registration</h2>

          <div className="input-box">
            <input type="text" placeholder="First Name" />
          </div>

          <div className="input-box">
            <input type="text" placeholder="Last Name" />
          </div>

          <div className="input-box">
            <input type="text" placeholder="Email" required />
            <PersonRoundedIcon fontSize="medium" className="icon" />
          </div>

          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <LockRoundedIcon fontSize="medium" className="icon" />
          </div>

          <button type="submit">Register</button>

          <div className="registration-link">
            <p className="registration-message">Existing User</p>
            <NavLink to="/login">Login</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};
