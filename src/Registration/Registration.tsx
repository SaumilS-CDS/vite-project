import { NavLink, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import bcrypt from "bcryptjs";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

import css from "./Registration.module.css";

import { RegistrationType } from "../Types/User.type";
import classNames from "classnames";
import { RegistrationValidationSchema } from "../../assets/utils/constants";
import { Alert, Snackbar } from "@mui/material";
import {
  PASSWORD_ENCRYPTION_KEY,
  USER_STORAGE_KEY,
} from "../Core/StorageConstant";

const initialValues = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
};

type ToastType = {
  showToast: boolean;
  toastMessage: string;
};

export const Registration = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showErrorToast, setShowErrorToast] = useState<ToastType | null>(null);

  const saveUserDetails = async (values: RegistrationType) => {
    try {
      const user = localStorage.getItem(USER_STORAGE_KEY);

      // If we found that user already set in local storage
      if (user) {
        const parsedUser = JSON.parse(user);

        // checking if email already registered.
        if (parsedUser.email === values.email) {
          throw new Error("User already registered.");
        }
      } else {
        const hashedPassword = bcrypt.hashSync(
          values.password,
          PASSWORD_ENCRYPTION_KEY
        ); // hash created previously created upon sign up

        const updatedUserDetails = {
          ...values,
          password: hashedPassword,
        };

        // Adding 4s delay to show loader like API calls.
        await new Promise((resolve) => setTimeout(resolve, 4000));
        localStorage.setItem(
          USER_STORAGE_KEY,
          JSON.stringify(updatedUserDetails)
        );
      }
      navigate("/login");
    } catch (error) {
      console.error(error);
      setShowErrorToast({
        showToast: true,
        toastMessage: error as string,
      });
    }
  };

  return (
    <>
      <div className={css.container}>
        <div className={css["background-image"]} />
        <div className={css.wrapper}>
          <Formik
            initialValues={initialValues}
            onSubmit={saveUserDetails}
            validationSchema={RegistrationValidationSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <h2>Registration</h2>

                <div className={css["input-box"]}>
                  <Field
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                  />
                </div>
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className={css.error}
                />

                <div className={css["input-box"]}>
                  <Field type="text" placeholder="Last Name" name="lastName" />
                </div>
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className={css.error}
                />

                <div className={css["input-box"]}>
                  <Field type="text" placeholder="Email" name="email" />
                  <PersonRoundedIcon fontSize="medium" className={css.icon} />
                </div>

                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.error}
                />

                <div className={css["input-box"]}>
                  <Field
                    placeholder="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                  />
                  <div onClick={() => setShowPassword((prev) => !prev)}>
                    <LockRoundedIcon
                      fontSize="small"
                      className={classNames(css.icon, css["visible-password"])}
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
                  Register
                </button>

                <div className={css["registration-link"]}>
                  <p className={css["registration-message"]}>Existing User</p>
                  <NavLink to="/login">Login</NavLink>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Snackbar
        open={showErrorToast?.showToast}
        className={css.snackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ width: "100%" }}
        autoHideDuration={4000}
        onClose={() => setShowErrorToast(null)}
      >
        <Alert severity="error" onClose={() => setShowErrorToast(null)}>
          Email already registered.
        </Alert>
      </Snackbar>
    </>
  );
};
