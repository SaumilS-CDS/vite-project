import { useAuth } from "../Core/AuthContext";
import css from "./About.module.css";

export const About = () => {
  const { user } = useAuth();

  const { firstName, lastName, email } = user || {};

  return (
    <div className={css.wrapper}>
      <h3>User Profile</h3>

      <div className={css["user-profile-container"]}>
        <img src="./../assets/icons/user.svg" className={css["user-image"]} />

        <div className={css["user-profile"]}>
          <div className={css["input-wrapper"]}>
            <div className={css.label}>First Name</div>
            <span>{firstName}</span>
          </div>
          <div className={css["input-wrapper"]}>
            <div className={css.label}>Last Name</div>
            <span>{lastName}</span>
          </div>
          <div className={css["input-wrapper"]}>
            <div className={css.label}>Email</div>
            <span>{email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
