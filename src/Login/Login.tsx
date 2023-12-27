import "./Login.css";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { NavLink } from "react-router-dom";

export const Login = () => {
  return (
    <div className="container">
      <div className="background-image" />
      <div className="wrapper">
        <form action="">
          <h2>Login</h2>
          <div className="input-box">
            <input type="text" placeholder="Email" required />
            <PersonRoundedIcon fontSize="medium" className="icon" />
          </div>

          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <LockRoundedIcon fontSize="medium" className="icon" />
          </div>

          <button type="submit">Login</button>

          <div className="registration-link">
            <p className="registration-message">Don't have account</p> <NavLink to="/register">Register</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};
