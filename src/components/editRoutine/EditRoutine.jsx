import { useState } from "react";
import "./EditRoutine.css";
import { renameRoutine } from "../../services/routineService";
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
    <div className="create-routine-container">
      <section>
        <form>
          <h1>Update routine name</h1>
          <input
            onChange={(event) => {
              const routineCopy = { ...routineName };
              routineCopy.name = event.target.value;
              setRoutineName(routineCopy);
            }}
          ></input>
        </form>
        <button className="save-btn" onClick={handleSaveNewRoutineName}>
          Save new routine name
        </button>
        <button className="cancel-btn">Cancel</button>
      </section>
    </div>
  );
};
