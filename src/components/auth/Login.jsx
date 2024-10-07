import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import "./Login.css"
import { getUserByEmail } from "../../services/userService";

export const Login = () => {
  const [email, set] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    return getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0];
        localStorage.setItem(
          "flexTrack_user",
          JSON.stringify({
            id: user.id,
          })
        );

        navigate("/");
      } else {
        window.alert("Invalid login");
      }
    });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="auth-container">
          <form className="auth-form" onSubmit={handleLogin}>
            <img
              src={"/images/flextrack-logo-blue.png"}
              alt="Logo"
              className="landing-logo"
            />
            <h2 className="sign-in">Sign in</h2>
            <fieldset className="auth-fieldset">
              <div>
                <h3>Email</h3>
                <input
                  type="email"
                  value={email}
                  className="auth-form-input"
                  onChange={(evt) => set(evt.target.value)}
                  required
                  autoFocus
                />
              </div>
            </fieldset>
            <fieldset className="auth-fieldset">
              <div>
                <button type="submit">Sign in</button>
              </div>
            </fieldset>
            <section className="register-link">
              <Link to="/register">Not a member yet?</Link>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};
