import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { createUser, getUserByEmail } from "../../services/userService";

export const Register = (props) => {
  const [user, setUser] = useState({
    email: "",
    fullName: "",
    cohort: 0,
  });
  let navigate = useNavigate();

  const registerNewUser = () => {
    const newUser = {
      ...user,
      cohort: parseInt(user.cohort),
    };

    createUser(newUser).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "flexTrack_user",
          JSON.stringify({
            id: createdUser.id,
            staff: createdUser.isStaff,
          })
        );

        navigate("/");
      }
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists");
      } else {
        // Good email, create user.
        registerNewUser();
      }
    });
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  return (
    <body className="login-page">
      <main className="auth-container">
        <form className="auth-form" onSubmit={handleRegister}>
          <img
            src={"/images/flextrack-logo-blue.png"}
            alt="Logo"
            className="landing-logo"
          />
          <h2>Please Register</h2>
          <fieldset className="auth-fieldset">
            <div>
              <h3>Full name</h3>
              <input
                onChange={updateUser}
                type="name"
                id="fullName"
                className="auth-form-input"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset className="auth-fieldset">
            <div>
              <h3>Email</h3>
              <input
                onChange={updateUser}
                type="email"
                id="email"
                className="auth-form-input"
                required
              />
            </div>
          </fieldset>
          <fieldset className="auth-fieldset">
            <div>
              <button type="submit">Register</button>
            </div>
            <div>
              <Link to="/login">
                <button type="submit">Back</button>
              </Link>
            </div>
          </fieldset>
        </form>
      </main>
    </body>
  );
};
