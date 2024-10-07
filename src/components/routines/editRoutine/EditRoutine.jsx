import { useState } from "react";
import "./EditRoutine.css";
import { renameRoutine } from "../../../services/routineService";
import { useNavigate, useParams } from "react-router-dom";

export const EditRoutine = ({ currentUser }) => {
  const [routineName, setRoutineName] = useState({ name: "" });
  const { routineId } = useParams();

  const navigate = useNavigate();

  const handleSaveNewRoutineName = () => {
    renameRoutine(routineName, routineId);

    navigate("/my-routines");
  };

  return (
    <div className="edit-routine-container">
      <section className="edit-routine-sub-container">
        <form className="edit-routine-form">
          <h1>Update routine name</h1>
          <input
            className="create-routine-input"
            onChange={(event) => {
              const routineCopy = { ...routineName };
              routineCopy.name = event.target.value;
              setRoutineName(routineCopy);
            }}
          ></input>
        </form>
        <div className="create-routine-actions">
          <button
            className="save-routine-btn"
            onClick={handleSaveNewRoutineName}
          >
            Save new routine name
          </button>
          <button className="cancel-routine-btn">Cancel</button>
        </div>
      </section>
    </div>
  );
};
