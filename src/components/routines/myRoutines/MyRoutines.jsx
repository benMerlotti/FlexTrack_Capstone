import { useEffect, useState } from "react";
import {
  assignDay,
  deleteRoutine,
  getAllRoutineExercises,
  getAllRoutines,
} from "../../../services/routineService";
import "./MyRoutines.css";
import { getAllDays } from "../../../services/dayService";
import {
  deleteRoutineExercise,
  getAllRoutineExercisesByRoutineId,
} from "../../../services/exerciseService";
import { useNavigate } from "react-router-dom";

export const MyRoutines = () => {
  const [myRoutines, setMyRoutines] = useState([]);
  const [routineExercises, setRoutineExercises] = useState([]);
  const [allDays, setAllDays] = useState([]);
  const [routineExercisesToBeDeleted, setRoutineExercisesToBeDeleted] =
    useState();
  const navigate = useNavigate();

  useEffect(() => {
    getAllRoutines().then((data) => {
      setMyRoutines(data);
    });
  }, []);

  useEffect(() => {
    getAllRoutineExercises().then((data) => {
      setRoutineExercises(data);
    });
  }, []);

  useEffect(() => {
    getAllDays().then((data) => {
      setAllDays(data);
    });
  }, []);

  const handleAssignDay = (day, routineId) => {
    assignDay(day, routineId).then(() => {
      getAllRoutines().then((data) => {
        setMyRoutines(data);
      });
    });
  };

  const handleClearDay = (routineId) => {
    const day = {
      name: "",
    };
    assignDay(day, routineId).then(() => {
      getAllRoutines().then((data) => {
        setMyRoutines(data);
      });
    });
  };

  const handleDeleteRoutine = (routineId) => {
    // Step 1: Fetch the routine exercises by routineId
    getAllRoutineExercisesByRoutineId(routineId).then((routEx) => {
      // Step 2: Delete each routine exercise after fetching them
      Promise.all(
        routEx.map((rex) => deleteRoutineExercise(rex.id)) // make sure you're using rex.id (or the correct id field) here
      )
        .then(() => {
          // Step 3: Once all exercises are deleted, delete the routine itself
          return deleteRoutine(routineId);
        })
        .then(() => {
          // Step 4: Fetch the updated list of routines to refresh the UI
          return getAllRoutines();
        })
        .then((data) => {
          setMyRoutines(data); // Update the state with the latest routines
        })
        .catch((error) => {
          console.error("Error deleting routine or exercises:", error);
        });
    });
  };

  const handleRenameRoutine = (routineId) => {
    navigate(`/edit-routine/${routineId}`);
  };

  const handleEditExercise = (routineExerciseId) => {
    navigate(`/edit-exercise/${routineExerciseId}`);
  };

  return (
    <div className="routines-container">
      <div className="routines-list">
        {myRoutines.length === 0 ? (
          <p>No routines found. Start creating some!</p>
        ) : (
          myRoutines.map((routine) => {
            const matchedExercises = routineExercises.filter(
              (ex) => ex.routineId === routine.id
            );
            return (
              <div key={routine.id} className="routine-card">
                <div className="routine-header">
                  <h2 className="routine-name">{routine.name}</h2>
                  <div className="routine-actions">
                    <button
                      className="routine-edit-btn"
                      onClick={() => handleRenameRoutine(routine.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="routine-delete-btn"
                      onClick={() => handleDeleteRoutine(routine.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="routine-exercises">
                  <div className="routine-exercises-header">
                    <header>Exercises</header>
                  </div>
                  {matchedExercises.map((ex) => (
                    <div key={ex.id} className="routine-exercise-item">
                      <div className="routine-exercise-name">
                        {ex.exercise?.name}
                      </div>
                      <div className="routine-exercise-sets">
                        <span>Sets</span>
                        <span>{ex.sets}</span>
                      </div>
                      <div className="routine-exercise-reps">
                        <span>Reps</span>
                        <span>{ex.reps}</span>
                      </div>
                      <div className="routine-exercise-weight">
                        <span>Weight</span>
                        <span>{ex.weight} lbs</span>
                      </div>
                      <div className="routine-exercise-edit-btn-container">
                        <button
                          className="exercise-edit-btn"
                          onClick={() => handleEditExercise(ex.id)}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="routine-days">
                  <h4>Assign to day</h4>
                  <div className="day-buttons">
                    {allDays.map((day) => (
                      <button
                        className={`day-btn ${
                          routine.day === day.name ? "assigned" : ""
                        }`}
                        key={day.id}
                        onClick={() => handleAssignDay(day, routine.id)}
                      >
                        {day.name.charAt(0)}
                      </button>
                    ))}
                  </div>
                  <div className="unassign-btn-container">
                    <button
                      className="unassign-btn"
                      onClick={() => handleClearDay(routine.id)}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
