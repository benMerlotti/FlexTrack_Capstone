export const getAllRoutines = () => {
  return fetch("http://localhost:8088/routines").then((res) => res.json());
};

export const getAllRoutineExercises = () => {
  return fetch(
    "http://localhost:8088/routineExercises?_expand=exercise&_expand=routine"
  ).then((res) => res.json());
};

export const saveRoutine = (routineData) => {
  return fetch("http://localhost:8088/routines", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(routineData),
  }).then((res) => res.json());
};

export const assignDay = (day, routineId) => {
  return fetch(`http://localhost:8088/routines/${routineId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ day: day.name }),
  }).then((res) => res.json());
};

export const deleteRoutine = (routineId) => {
  return fetch(`http://localhost:8088/routines/${routineId}`, {
    method: "DELETE",
  });
};

export const renameRoutine = (newName, routineId) => {
  return fetch(`http://localhost:8088/routines/${routineId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: newName.name }),
  }).then((res) => res.json());
};
