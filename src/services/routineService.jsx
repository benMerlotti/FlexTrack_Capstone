export const getAllRoutines = () => {
  return fetch("http://localhost:8088/routines").then((res) => res.json());
};

export const getAllRoutineExercises = () => {
  return fetch("http://localhost:8088/routineExercises?_expand=exercise").then(
    (res) => res.json()
  );
};
