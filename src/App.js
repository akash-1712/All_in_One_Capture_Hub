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
// import { FetchActivityData } from "./store/activity-action";
import { AuthActions } from "./store/auth-slice";
import WebCam from "./Components/pages/webCam/WebCam";
import Audio from "./Components/pages/Audio/Audio";
import Screen from "./Components/pages/Screen/Screen";
import HomePage from "./Components/pages/HomePage/HomePage";
import Card from "./Components/Utils/Card/Card";
import styles from "./_app.module.scss";
import About from "./Components/pages/About/About";

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
    const tokenData = getStoredToken();
    if (tokenData.token) {
      dispatch(
        AuthActions.login({
          token: tokenData.token,
          time: tokenData.duration,
          timer: setTimeout(() => {
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
          index: true,
          element: (
            <Card className={styles.homePage}>
              <About></About>
              <HomePage></HomePage>

              <h1 className={styles.title}>All In One Hub</h1>
              <div>
                <p>
                  Designed By :- <span>AKASH VERMA</span>
                </p>
                <p>
                  Contact No :- <span>9958486922</span>
                </p>
              </div>
            </Card>
          ),
        },
        {
          path: "login",
          element: !auth.isLoggedIn ? <Login /> : <Navigate to="/"></Navigate>,
        },
        {
          path: "signup",
          // element: !auth.isLoggedIn ? <Signup /> : <Navigate to="/"></Navigate>,
          element: <Signup></Signup>,
        },
        {
          path: "webCam",
          element: auth.isLoggedIn ? (
            <WebCam></WebCam>
          ) : (
            <Navigate to="/login"></Navigate>
          ),
        },
        {
          path: "audio",
          element: auth.isLoggedIn ? (
            <Audio></Audio>
          ) : (
            <Navigate to="/login"></Navigate>
          ),
        },
        {
          path: "screen",
          element: auth.isLoggedIn ? (
            <Screen></Screen>
          ) : (
            <Navigate to="/login"></Navigate>
          ),
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
