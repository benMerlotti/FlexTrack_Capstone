import { useEffect, useState } from "react";
import { getAllRoutineExercises } from "../../services/routineService";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllExercises,
  updateRoutineExercise,
} from "../../services/exerciseService";

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

    if (selectedExercise !== "Choose exercise") {
      setChosenExercise(selectedExercise);
    }
  };

  const selectedExerciseId = allExercises.find(
    (ex) => ex.name === chosenExercise
  );

  const handleUpdateExercise = (currentRoutineEx) => {
    const toBeSavedExercise = {
      exerciseId: selectedExerciseId.id,
      sets: parseInt(currentRoutineEx.sets),
      reps: parseInt(currentRoutineEx.reps),
      weight: parseInt(currentRoutineEx.weight),
    };

    updateRoutineExercise(toBeSavedExercise, currentRoutineEx);
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
    <>
      {currentRoutineEx && (
        <div key={currentRoutineEx.id}>
          <form className="add-exercise-container">
            <select onChange={handleExerciseSelect}>
              <option value={currentRoutineEx.exercise?.name}>
                {currentRoutineEx.exercise?.name}
              </option>
              {allExercises.map((ex) => (
                <option value={ex.name} key={ex.id}>
                  {ex.name}
                </option>
              ))}
            </select>
          </form>

          <form className="add-exercise-form">
            <div className="exercise-controls">
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
              <button
                className="edit-btn"
                type="submit"
                onClick={() => handleUpdateExercise(currentRoutineEx)}
              >
                Update exercise
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
