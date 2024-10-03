import { useEffect, useState } from "react";
import { getAllDays } from "../../services/dayService";
import "./Dashboard.css";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const [allDays, setAllDays] = useState([]);

  useEffect(() => {
    getAllDays().then((data) => {
      setAllDays(data);
    });
  }, []);

  return (
    <div className="dash-day-buttons-container">
      <div className="dash-day-buttons">
        {allDays.map((day) => (
          <Link to={`/days/${day.id}`} key={day.id}>
            <button className="dash-day-btn" key={day.id}>
              {day.name.charAt(0)}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};
