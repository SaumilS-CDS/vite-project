import { useAuth } from "../Core/AuthContext";
import css from "./Dashboard.module.css";
import { SortAndFilterTable } from "./Table";

export const Dashboard = () => {
  const { user } = useAuth();
  const { firstName, lastName } = user || {};

  return (
    <div>
      <div className={css.wrapper}>
        <div className={css["section-user-data"]}>
          <h1 className={css["user-heading"]}>
            Welcome {firstName} {lastName}
          </h1>
          <p className={css["user-paragraph"]}>To Book management system</p>
        </div>

        <div className={css["book-image"]}>
          <img
            src="./../assets/icons/book-list.svg"
            alt="book image"
            className="book-img"
          />
        </div>
      </div>
      <SortAndFilterTable />
    </div>
  );
};
