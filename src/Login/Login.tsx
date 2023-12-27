import { NavLink } from "react-router-dom";
import { ErrorMessage, Field, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

// Icons
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

// Helper
import { getCharacterValidationError } from "../Shared/helper";

// CSS
import "./Login.css";

export const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="container">
      <div className="background-image" />
      <div className="wrapper">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email()
              .required("Email is Required")
              .matches(/^(?!.*@[^,]*,)/),
            password: Yup.string()
              .required("Password is Required")
              // check minimum characters
              .min(8, "Password must have at least 8 characters")
              // different error messages for different requirements
              .matches(/[0-9]/, getCharacterValidationError("digit"))
              .matches(/[a-z]/, getCharacterValidationError("lowercase"))
              .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
          })}
        >
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <h2>Login</h2>
            <div className="input-box">
              <Field type="text" placeholder="Email" name="email" />
              <PersonRoundedIcon fontSize="medium" className="icon" />
            </div>

            <ErrorMessage name="email" component="div" className="error" />

            <div className="input-box">
              <Field
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <div onClick={() => setShowPassword((prev) => !prev)}>
                <LockRoundedIcon
                  fontSize="medium"
                  className="icon visible-password"
                />
              </div>
            </div>
            <ErrorMessage name="password" component="div" className="error" />

            <button type="submit">Login</button>

            <div className="registration-link">
              <p className="registration-message">Don't have account</p>{" "}
              <NavLink to="/register">Register</NavLink>
            </div>
          </form>
        </Formik>
      </div>
    </div>
  );
};
