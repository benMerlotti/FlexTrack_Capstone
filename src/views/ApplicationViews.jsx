import { Outlet, Route, Routes } from "react-router-dom";
import { Dashboard } from "../components/dashboard/dashboard";
import { NavBar } from "../components/nav/NavBar";
import { CreateRoutine } from "../components/routines/createRoutine/CreateRoutine";
import { MyRoutines } from "../components/routines/myRoutines/MyRoutines";
import { useEffect, useState } from "react";
import { AddExercise } from "../components/exercises/addExercise/AddExercise";
import { Days } from "../components/days/Days";
import { EditRoutine } from "../components/routines/editRoutine/EditRoutine";
import { EditExercise } from "../components/exercises/editExercise/EditExercise";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const flexTrackUser = localStorage.getItem("flexTrack_user");
    const flexTrackUserObject = JSON.parse(flexTrackUser);

    setCurrentUser(flexTrackUserObject);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<Dashboard />} />
        <Route
          path="create-routine"
          element={<CreateRoutine currentUser={currentUser} />}
        />
        <Route
          path="my-routines"
          element={<MyRoutines currentUser={currentUser} />}
        />
        <Route
          path="add-exercises/:routineId"
          element={<AddExercise currentUser={currentUser} />}
        />
        <Route
          path="days/:dayId"
          element={<Days currentUser={currentUser} />}
        />
        <Route
          path="edit-routine/:routineId"
          element={<EditRoutine currentUser={currentUser} />}
        />
        <Route
          path="edit-exercise/:routineExerciseId"
          element={<EditExercise currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
