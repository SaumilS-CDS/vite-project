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
import { Snackbar } from "@mui/material";

export const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);

  const navigate = useNavigate();

  const validateUser = async (values: LoginType) => {
    try {
      // Validating the user entered password and email
      const userDetails = JSON.parse(localStorage.getItem("UserDetails") || "");
      const passwordMatch = bcrypt.compareSync(
        values.password,
        userDetails.password
      );
      // Adding 4s delay to show loader like API calls.
      await new Promise((resolve) => setTimeout(resolve, 4000));
      if (passwordMatch && userDetails.email === values.email) {
        sessionStorage.setItem("isLoggedIn", "LOGGED_IN");
        navigate("/");
      } else {
        setShowErrorToast(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
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
            {({ isSubmitting }) => (
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
                <ErrorMessage
                  name="password"
                  component="div"
                  className={css.error}
                />

                <button
                  className={isSubmitting ? css.disabled : ""}
                  disabled={isSubmitting}
                >
                  Login
                </button>

                <div className={css.registrationLink}>
                  <p className={css.registrationMessage}>Don't have account</p>{" "}
                  <NavLink to="/signup">Register</NavLink>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Snackbar
        open={showErrorToast}
        className={css.snackbar}
        sx={{ width: "100%" }}
        autoHideDuration={4000}
        onClose={() => setShowErrorToast(false)}
        message="Something went wrong. Please try again."
      />
    </>
  );
};
