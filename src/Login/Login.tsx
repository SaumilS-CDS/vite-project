import { NavLink, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import bcrypt from "bcryptjs";

// Icons
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

// Helper
import { getCharacterValidationError } from "../Shared/helper";

// CSS
import css from "./Login.module.css";

// Types
import { LoginType } from "../Types/User.type";
import classNames from "classnames";

export const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const validateUser = (values: LoginType) => {
    const userDetails = JSON.parse(localStorage.getItem("UserDetails") || "");
    const passwordMatch = bcrypt.compareSync(
      values.password,
      userDetails.password
    );
    if (passwordMatch && userDetails.email === values.email) {
      sessionStorage.setItem("isLoggedIn", "LOGGED_IN");
      navigate("/");
    }
  };

  return (
    <div className={css.container}>
      <div className={css.backgroundImage} />
      <div className={css.wrapper}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={validateUser}
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
          <Form>
            <h2>Login</h2>
            <div className={css.inputBox}>
              <Field type="text" placeholder="Email" name="email" />
              <PersonRoundedIcon fontSize="medium" className={css.icon} />
            </div>

            <ErrorMessage name="email" component="div" className="error" />

            <div className={css.inputBox}>
              <Field
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <div onClick={() => setShowPassword((prev) => !prev)}>
                <LockRoundedIcon
                  fontSize="small"
                  className={classNames(css.icon, css.visiblePassword)}
                />
              </div>
            </div>
            <ErrorMessage name="password" component="div" className={css.error} />

            <button>Login</button>

            <div className={css.registrationLink}>
              <p className={css.registrationMessage}>Don't have account</p>{" "}
              <NavLink to="/register">Register</NavLink>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
