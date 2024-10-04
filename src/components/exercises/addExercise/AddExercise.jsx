import { useEffect, useState } from "react";
import {
  deleteExerciseFromRoutine,
  getAllExercises,
  saveExerciseToRoutine,
} from "../../../services/exerciseService";
import "./AddExercise.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllRoutineExercises,
  getAllRoutines,
} from "../../../services/routineService";

export const AddExercise = () => {
  const [allExercises, setAllExercises] = useState([]);
  const [chosenExercise, setChosenExercise] = useState("");
  const [allRoutines, setAllRoutines] = useState([]);
  const [currentRoutine, setCurrentRoutine] = useState({});
  const [allRoutineEx, setAllRoutineEx] = useState([]);
  const [currentRoutineEx, setCurrentRoutineEx] = useState([]);
  const [newExercise, setNewExercise] = useState({
    sets: 0,
    reps: 0,
    weight: 0,
  });
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
    setCurrentRoutine(matchedRoutine);
  }, [allRoutines, routineId]);

  useEffect(() => {
    getAllExercises().then((data) => {
      setAllExercises(data);
    });
  }, []);

  useEffect(() => {
    getAllRoutineExercises().then((data) => {
      setAllRoutineEx(data);
    });
  }, []);

  useEffect(() => {
    const matchedRoutineEx = allRoutineEx.filter((rout) => {
      return rout.routineId === parseInt(routineId);
    });
    setCurrentRoutineEx(matchedRoutineEx);
  }, [allRoutineEx, routineId]);

  const handleExerciseSelect = (event) => {
    const selectedExercise = event.target.value;

    if (selectedExercise !== "Choose exercise") {
      setChosenExercise(selectedExercise);
    }
  };

  const selectedExerciseId = allExercises.find(
    (ex) => ex.name === chosenExercise
  );

  const handleSaveExercise = () => {
    const toBeSavedExercise = {
      routineId: parseInt(routineId),
      exerciseId: selectedExerciseId.id,
      sets: parseInt(newExercise.sets),
      reps: parseInt(newExercise.reps),
      weight: parseInt(newExercise.weight),
    };

    saveExerciseToRoutine(toBeSavedExercise);
  };

  const handleDeleteExercise = (exercise) => {
    deleteExerciseFromRoutine(exercise);
    getAllRoutineExercises().then((data) => {
      setAllRoutineEx(data);
    });
  };

  const handleSaveRoutine = () => {
    navigate("/my-routines");
  };

  return (
    <div className="add-exercise-container">
      <h1 className="routine-name">
        {currentRoutine ? currentRoutine.name : "Loading..."}
      </h1>

      <div className="current-routine-container">
        <ul className="current-routine">
          {currentRoutineEx.map((current) => {
            return (
              <div className="added-exercise" key={current.id}>
                <li className="current-routine-item">
                  <div className="exercise-info">
                    <span className="exercise-name">
                      {current.exercise?.name}
                    </span>
                    <span className="exercise-details">
                      Sets: <div className="result">{current.sets}</div>
                    </span>
                    <span className="exercise-details">
                      Reps: <div className="result">{current.reps}</div>
                    </span>
                    <span className="exercise-details">
                      Weight: <div className="result">{current.weight}</div>
                    </span>
                  </div>
                </li>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteExercise(current)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="exercise-container">
        <form className="choose-exercise-form">
          <select
            className="choose-exercise-menu"
            onChange={handleExerciseSelect}
          >
            <option value="Choose exercise">Choose exercise</option>
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
              className="exercise-input"
              type="number"
              name="sets"
              onChange={(event) => {
                const newExerciseCopy = { ...newExercise };
                newExerciseCopy.sets = event.target.value;
                setNewExercise(newExerciseCopy);
              }}
            />
            <label>Reps</label>
            <input
              className="exercise-input"
              type="number"
              name="reps"
              onChange={(event) => {
                const newExerciseCopy = { ...newExercise };
                newExerciseCopy.reps = event.target.value;
                setNewExercise(newExerciseCopy);
              }}
            />
            <label>Weight</label>
            <input
              className="exercise-input"
              type="number"
              name="weight"
              onChange={(event) => {
                const newExerciseCopy = { ...newExercise };
                newExerciseCopy.weight = event.target.value;
                setNewExercise(newExerciseCopy);
              }}
            />
            <button
              className="add-btn"
              type="submit"
              onClick={handleSaveExercise}
            >
              Add to routine
            </button>
          </div>
        </form>
      </div>
      <div className="save-cancel-btn-container">
        <button className="save-btn" onClick={handleSaveRoutine}>
          Save Routine
        </button>
      </div>
    </div>
  );
};
