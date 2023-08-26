import React, { Fragment, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import RootLayout from "./Components/Routes/Root";
import Login from "./Components/pages/Login/Login";
import Signup from "./Components/pages/signup/signup";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "./store/user-action";
import { FetchActivityData } from "./store/activity-action";
import { AuthActions } from "./store/auth-slice";

const calcRemTime = (expTime) => {
  const currTime = new Date().getTime();
  const expirationTime = new Date(+expTime).getTime();
  // console.log(expTime, currTime, expirationTime);
  return expirationTime - currTime;
};

const getStoredToken = () => {
  const storedToken = localStorage.getItem("token") || null;
  const storedExpirationTime = localStorage.getItem("expirationTime") || 0;
  const remainingTime = calcRemTime(storedExpirationTime);
  // console.log(remainingTime, storedExpirationTime);
  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return { token: null };
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.Auth);
  useEffect(() => {
    dispatch(FetchActivityData(1, auth.isLoggedIn));
    const tokenData = getStoredToken();
    if (tokenData.token) {
      dispatch(
        AuthActions.login({
          token: tokenData.token,
          time: tokenData.duration,
          timer: setTimeout(() => {
            // console.log("timeOut");
            dispatch(AuthActions.logout());
          }, tokenData.duration),
        })
      );
      dispatch(fetchUser());
    }
  }, [dispatch, auth.isLoggedIn]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout></RootLayout>,
      children: [
        {
          path: "login",
          element: !auth.isLoggedIn ? <Login /> : <Navigate to="/"></Navigate>,
        },
        {
          path: "signup",
          element: !auth.isLoggedIn ? <Signup /> : <Navigate to="/"></Navigate>,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);
  return (
    <Fragment>
      <RouterProvider router={router}></RouterProvider>;
    </Fragment>
  );
}

export default App;
