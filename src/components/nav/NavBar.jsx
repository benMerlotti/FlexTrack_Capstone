import { Link } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <div className="navbar">
      <img
        src={"/images/flextrack-logo.png"}
        alt="Logo"
        className="navbar-logo"
      />
      <ul className="navbar-list">
        <li className="navbar-list-item">
          <Link to="">Dashboard</Link>
        </li>
        <li className="navbar-list-item">
          <Link to="create-routine">Create A Routine</Link>
        </li>
        <li className="navbar-list-item">
          <Link to="my-routines">My Routines</Link>
        </li>
      </ul>
      {localStorage.getItem("flexTrack_user") ? (
        <li className="navbar-logout">
          <Link
            className="navbar-link"
            to=""
            onClick={() => {
              localStorage.removeItem("flexTrack_user");
              navigate("/", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </div>
  );
};
