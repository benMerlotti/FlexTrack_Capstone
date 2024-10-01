import { Outlet, Route, Routes } from "react-router-dom";
import { Dashboard } from "../components/dashboard/dashboard";
import { NavBar } from "../components/nav/NavBar";
import { CreateRoutine } from "../components/createRoutine/CreateRoutine";
import { MyRoutines } from "../components/myRoutines/MyRoutines";
import { useEffect, useState } from "react";
import { CreateExercise } from "../components/createExercise/CreateExercise";

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
          path="create-exercise"
          element={<CreateExercise currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
