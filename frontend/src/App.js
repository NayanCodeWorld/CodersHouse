import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Navigation from "./components/shared/Navigation/Navigation";
import Authentcate from "./pages/authenticate/Authenticate/Authenticate";
import Activate from "./pages/authenticate/Activate/Activate";
import Rooms from "./pages/Rooms/Rooms";
import { useSelector } from "react-redux";

function App() {
  const { user, isAuth } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        //Guest Area
        <Route
          path="/"
          element={
            isAuth ? (
              !user.activated ? (
                <Navigate replace to="/activate" />
              ) : (
                <Navigate replace to="/rooms" />
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
              !user.activate ? (
                <Navigate replace to="/activate" />
              ) : (
                <Navigate replace to="/rooms" />
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
              !user.activate ? (
                <Activate />
              ) : (
                <Navigate replace to="/rooms" />
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
              !user.activate ? (
                <Navigate replace to="/activate" />
              ) : (
                <Rooms />
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
