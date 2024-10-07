import { useNavigate } from "react-router-dom";
import "./Landing.css";

export const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="landing-container">
      <div className="logo-container">
        <img
          src={"/images/flextrack-logo.png"}
          alt="Logo"
          className="landing-logo"
        />
      </div>
      <h1 className="landing-header-container">
        <span>Track your workouts.</span>
        <span>Reach your goals.</span>
      </h1>
      <h2 className="landing-header2-container">
        <span>
          Build custom workout routines, track your progress, and stay
          motivated. Whether you're lifting, running, or staying active—our app
          makes fitness simple.
        </span>
      </h2>
      <div className="sign-in-btn-container">
        <button
          className="sign-in-btn"
          onClick={() => {
            navigate("/login");
          }}
        >
          Sign in
        </button>
      </div>
    </div>
  );
};
