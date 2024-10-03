import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllDays } from "../../services/dayService";
import {
  getAllRoutineExercises,
  getAllRoutines,
} from "../../services/routineService";
import "./Days.css";

export const Days = () => {
  const [allDays, setAllDays] = useState([]);
  const [allRoutines, setAllRoutines] = useState([]);
  const [routineExercises, setRoutineExercises] = useState([]);
  const { dayId } = useParams();

  useEffect(() => {
    getAllDays().then((data) => {
      setAllDays(data);
    });
  }, []);

  useEffect(() => {
    getAllRoutines().then((data) => {
      setAllRoutines(data);
    });
  }, []);

  useEffect(() => {
    getAllRoutineExercises().then((data) => {
      setRoutineExercises(data);
    });
  }, []);

  const currentDay = allDays.find((day) => day.id === parseInt(dayId));

  const matchedRoutines = allRoutines.filter(
    (routine) => routine.day === currentDay.name
  );

  return matchedRoutines.length > 0 ? (
    <div className="day-routine-container">
      <div className="day-routine-list">
        {matchedRoutines.map((dayRoutine) => {
          const matchedExercises = routineExercises.filter(
            (ex) => ex.routineId === dayRoutine.id
          );
          return (
            <div key={dayRoutine.id} className="day-routine-card">
              <div className="day-routine-header">
                <h2 className="day-routine-name">{dayRoutine.name}</h2>
              </div>
              <div className="day-routine-exercises">
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
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="no-routine-message">No routines assigned!</div>
  );
};
