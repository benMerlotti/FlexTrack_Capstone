import { useState } from "react";
import "./CreateRoutine.css";
import { saveRoutine } from "../../services/routineService";
import { useNavigate } from "react-router-dom";

export const CreateRoutine = ({ currentUser }) => {
  const [routine, setRoutine] = useState({ name: "", day: "" });

  const navigate = useNavigate();

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // This will return the date in "YYYY-MM-DD" format
  };

  const handleSaveRoutine = () => {
    const newRoutine = {
      name: routine.name,
      userId: currentUser.id,
      day: routine.day,
      createdAt: getCurrentDate(),
    };

    saveRoutine(newRoutine).then((newRoutine) => {
      navigate(`/add-exercises/${newRoutine.id}`);
    });
  };

  return (
    <div className="create-routine-container">
      <section className="create-routine-sub-container">
        <form className="create-routine-form">
          <h1>Name your new routine</h1>
          <input
            className="create-routine-input"
            onChange={(event) => {
              const routineCopy = { ...routine };
              routineCopy.name = event.target.value;
              setRoutine(routineCopy);
            }}
          ></input>
        </form>
        <div className="create-routine-actions">
          <button className="save-routine-btn" onClick={handleSaveRoutine}>
            Save Routine and Add Exercises
          </button>
          <button className="cancel-routine-btn">Cancel</button>
        </div>
      </section>
    </div>
  );
};
