import { useEffect, useState } from "react";
import "./CreateRoutine.css";
import { getAllExercises } from "../../services/exerciseService";
import { Link } from "react-router-dom";

export const CreateRoutine = ({ currentUser }) => {
  const [allExercises, setAllExercises] = useState([]);
  const [routine, setRoutine] = useState([]);
  const [myExercises, setMyExercises] = useState([]);

  useEffect(() => {
    getAllExercises().then((data) => {
      setAllExercises(data);
    });
  }, []);

  const handleExerciseSelect = (event) => {
    const selectedExercise = event.target.value;

    if (
      selectedExercise !== "Choose exercise" &&
      !myExercises.includes(selectedExercise)
    ) {
      setMyExercises((prevExercises) => [...prevExercises, selectedExercise]);
    }
  };

  return (
    <div className="create-routine-container">
      <section>
        <form>
          <h1>Name your routine</h1>
          <input></input>
        </form>
        <form>
          <h2>Exercises</h2>
          <ul>
            {myExercises.map((ex) => {
              return (
                <>
                  <li className="exercise-row" key={ex}>
                    <span>{ex}</span>
                    <div className="exercise-controls">
                      <div>Sets</div>
                      <div>Reps</div>
                      <div>Weight</div>
                      <button className="edit-btn">
                        <Link to="create-exercise">Edit</Link>
                      </button>
                      <button className="delete-btn">X</button>
                    </div>
                  </li>
                </>
              );
            })}
          </ul>
        </form>

        <form className="add-exercise-container">
          <select onChange={handleExerciseSelect}>
            <option value="Choose exercise">Choose exercise</option>
            {allExercises.map((ex) => {
              return (
                <option value={ex.name} key={ex.id}>
                  {ex.name}
                </option>
              );
            })}
          </select>
        </form>

        <button className="save-btn">Save Routine</button>
        <button className="cancel-btn">Cancel</button>
      </section>
    </div>
  );
};
