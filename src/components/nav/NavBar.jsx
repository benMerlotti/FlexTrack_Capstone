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
      <li className="navbar-logout">Logout</li>
    </div>
  );
};
