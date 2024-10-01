import { Link } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <div className="navbar">
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
        <li className="navbar-list-item">Logout</li>
      </ul>
    </div>
  );
};
