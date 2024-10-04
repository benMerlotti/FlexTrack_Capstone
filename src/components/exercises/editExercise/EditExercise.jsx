import { useEffect, useState } from "react";
import { getAllRoutineExercises } from "../../../services/routineService";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllExercises,
  updateRoutineExercise,
} from "../../../services/exerciseService";
import "./EditExercise.css";

export const EditExercise = () => {
  const [allExercises, setAllExercises] = useState([]);
  const [chosenExercise, setChosenExercise] = useState("");
  const [allRoutineExercises, setAllRoutineExercises] = useState();
  const [currentRoutineEx, setCurrentRoutineEx] = useState();
  const [newExercise, setNewExercise] = useState({
    sets: 0,
    reps: 0,
    weight: 0,
  });
  const { routineExerciseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getAllExercises().then((data) => {
      setAllExercises(data);
    });
  }, []);

  useEffect(() => {
    getAllRoutineExercises().then((data) => {
      setAllRoutineExercises(data);
    });
  }, []);

  const handleExerciseSelect = (event) => {
    const selectedExercise = event.target.value;

    if (selectedExercise !== "Current exercise") {
      const selectedExerciseObj = allExercises.find(
        (ex) => ex.name === selectedExercise
      );

      setChosenExercise(selectedExerciseObj);

      setCurrentRoutineEx({
        ...currentRoutineEx,
        exerciseId: selectedExerciseObj.id,
      });
    }
  };

  const handleUpdateExercise = (currentRoutineEx) => {
    const toBeSavedExercise = {
      exerciseId: currentRoutineEx.exerciseId,
      sets: parseInt(currentRoutineEx.sets),
      reps: parseInt(currentRoutineEx.reps),
      weight: parseInt(currentRoutineEx.weight),
    };

    updateRoutineExercise(toBeSavedExercise, currentRoutineEx);

    navigate("/my-routines");
  };

  useEffect(() => {
    if (allRoutineExercises) {
      const matchedRex = allRoutineExercises.find((rex) => {
        const match = rex.id === parseInt(routineExerciseId);
        return match;
      });
      setCurrentRoutineEx(matchedRex);
    }
  }, [allRoutineExercises, routineExerciseId]);

  return (
    <div className="edit-exercise-container">
      {currentRoutineEx && (
        <div className="form-container" key={currentRoutineEx.id}>
          <div className="form-menu-input-box">
            <form className="edit-exercise-form">
              <select
                className="edit-exercise-menu"
                onChange={handleExerciseSelect}
              >
                <option value="Current exercise">
                  {currentRoutineEx.exercise?.name}
                </option>
                {allExercises.map((ex) => (
                  <option value={ex.name} key={ex.id}>
                    {ex.name}
                  </option>
                ))}
              </select>
            </form>

            <form className="edit-exercise-controls-container">
              <div className="edit-exercise-controls">
                <label>Sets</label>
                <input
                  type="number"
                  name="sets"
                  value={currentRoutineEx.sets}
                  onChange={(event) => {
                    const newExerciseCopy = { ...currentRoutineEx };
                    newExerciseCopy.sets = event.target.value;
                    setCurrentRoutineEx(newExerciseCopy);
                  }}
                />
                <label>Reps</label>
                <input
                  type="number"
                  name="reps"
                  value={currentRoutineEx.reps}
                  onChange={(event) => {
                    const newExerciseCopy = { ...currentRoutineEx };
                    newExerciseCopy.reps = event.target.value;
                    setCurrentRoutineEx(newExerciseCopy);
                  }}
                />
                <label>Weight</label>
                <input
                  type="number"
                  name="weight"
                  value={currentRoutineEx.weight}
                  onChange={(event) => {
                    const newExerciseCopy = { ...currentRoutineEx };
                    newExerciseCopy.weight = event.target.value;
                    setCurrentRoutineEx(newExerciseCopy);
                  }}
                />
              </div>
            </form>
          </div>
          <div className="btn-container">
            <button
              className="update-exercise-btn"
              type="submit"
              onClick={() => handleUpdateExercise(currentRoutineEx)}
            >
              Update exercise
            </button>
            <button
              className="cancel-exercise-btn"
              onClick={() => navigate("/my-routines")}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
