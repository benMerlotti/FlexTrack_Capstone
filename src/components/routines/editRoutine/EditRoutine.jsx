import { useEffect, useState } from "react";
import "./EditRoutine.css";
import {
  getAllRoutines,
  renameRoutine,
} from "../../../services/routineService";
import { useNavigate, useParams } from "react-router-dom";

export const EditRoutine = ({ currentUser }) => {
  const [allRoutines, setAllRoutines] = useState([]);
  const [currentRoutine, setCurrentRoutine] = useState({ name: "" });
  const { routineId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getAllRoutines().then((data) => {
      setAllRoutines(data);
    });
  }, []);

  useEffect(() => {
    const matchedRoutine = allRoutines.find(
      (routine) => routine.id === parseInt(routineId)
    );
    if (matchedRoutine) {
      setCurrentRoutine(matchedRoutine);
    }
  }, [allRoutines, routineId]);

  const handleSaveNewRoutineName = () => {
    renameRoutine(currentRoutine, routineId).then(() => {
      navigate("/my-routines");
    });
  };

  return (
    <div className="edit-routine-container">
      <section className="edit-routine-sub-container">
        <form className="edit-routine-form">
          <h1>Update routine name</h1>
          <input
            className="create-routine-input"
            value={currentRoutine.name}
            onChange={(event) => {
              const routineCopy = { ...currentRoutine };
              routineCopy.name = event.target.value;
              setCurrentRoutine(routineCopy);
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
