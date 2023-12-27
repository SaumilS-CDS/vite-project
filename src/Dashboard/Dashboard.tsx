import "./Dashboard.css";

export const Dashboard = () => {
  return (
    <div className="container grid grid-two-column">
      <div className="section-user-data">
        <h1 className="user-heading">Welcome Saumil Shah</h1>
        <p className="user-paragraph">To Book management system</p>
      </div>

      <div className="book-image">
        <img
          src="./../assets/icons/book-list.svg"
          alt="book image"
          className="book-img"
        />
      </div>
    </div>
  );
};
