export const getAllExercises = () => {
  return fetch("http://localhost:8088/exercises").then((res) => res.json());
};

export const saveExerciseToRoutine = (exerciseData) => {
  return fetch("http://localhost:8088/routineExercises", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(exerciseData),
  }).then((res) => res.json());
};

export const deleteExerciseFromRoutine = (exercise) => {
  return fetch(`http://localhost:8088/routineExercises/${exercise.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getAllRoutineExercisesByRoutineId = (routineId) => {
  return fetch(
    `http://localhost:8088/routineExercises?routineId=${routineId}`
  ).then((res) => res.json());
};

export const deleteRoutineExercise = (exerciseId) => {
  return fetch(`http://localhost:8088/routineExercises/${exerciseId}`, {
    method: "DELETE",
  });
};

export const updateRoutineExercise = (newRexObj, updatedRex) => {
  return fetch(`http://localhost:8088/routineExercises/${updatedRex.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRexObj),
  }).then((res) => res.json());
};
