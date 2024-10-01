import { useEffect, useState } from "react";
import {
  getAllRoutineExercises,
  getAllRoutines,
} from "../../services/routineService";
import "./MyRoutines.css";
import { getAllDays } from "../../services/dayService";

export const MyRoutines = () => {
  const [myRoutines, setMyRoutines] = useState([]);
  const [routineExercises, setRoutineExercises] = useState([]);
  const [allDays, setAllDays] = useState([]);

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
                <h2 className="routine-name">{routine.name}</h2>
                <div className="routine-exercises">
                  <table>
                    <thead>
                      <tr>
                        <th>Exercise</th>
                        <th>Sets</th>
                        <th>Reps</th>
                        <th>Weight</th>
                      </tr>
                    </thead>
                    <tbody>
                      {matchedExercises.map((ex) => (
                        <tr key={ex.id}>
                          <td>{ex.exercise?.name}</td>
                          <td>{ex.sets}</td>
                          <td>{ex.reps}</td>
                          <td>{ex.weight} lbs</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="routine-actions">
                  <button className="edit-btn">Edit</button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(routine.id)}
                  >
                    Delete
                  </button>
                </div>
                <div className="routine-days">
                  <h4>Assign to day</h4>
                  <div className="day-buttons">
                    {allDays.map((day) => (
                      <button className="day-btn" key={day.id}>
                        {day.name.charAt(0)}
                      </button>
                    ))}
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
