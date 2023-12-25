import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./App.css";

import Home from "./pages/Home/Home";
import Navigation from "./components/shared/Navigation/Navigation";
import Authentcate from "./pages/authenticate/Authenticate/Authenticate";
import Activate from "./pages/authenticate/Activate/Activate";
import Rooms from "./pages/Rooms/Rooms";
import Room from "./pages/Room/Room";

import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";
import Loader from "./components/shared/Loader/Loader";

function App() {
  const { user, isAuth } = useSelector((state) => state.auth);
  console.log({ user, isAuth });
  const { loading } = useLoadingWithRefresh();

  return loading ? (
    <Loader message="Loading pls wait..." />
  ) : (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            isAuth ? (
              user.activated ? (
                <Navigate replace to="/rooms" />
              ) : (
                <Navigate replace to="/activate" />
              )
            ) : (
              <Home />
            )
          }
        />
        <Route
          path="authenicate"
          element={
            isAuth ? (
              user.activated ? (
                <Navigate replace to="/rooms" />
              ) : (
                <Navigate replace to="/activate" />
              )
            ) : (
              <Authentcate />
            )
          }
        />
        <Route
          path="activate"
          element={
            isAuth ? (
              user.activated ? (
                <Navigate replace to="/rooms" />
              ) : (
                <Activate />
              )
            ) : (
              <Navigate replace to="/" />
            )
          }
        />
        <Route
          path="rooms"
          element={
            isAuth ? (
              user.activated ? (
                <Rooms />
              ) : (
                <Navigate replace to="/activate" />
              )
            ) : (
              <Navigate replace to="/" />
            )
          }
        />
        <Route
          path="room/:id"
          element={
            isAuth ? (
              user.activated ? (
                <Room />
              ) : (
                <Navigate replace to="/activate" />
              )
            ) : (
              <Navigate replace to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
