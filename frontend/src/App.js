import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Navigation from "./components/shared/Navigation/Navigation";
import Register from "./pages/Register/Register";
import Authentcate from "./pages/authenticate/Authenticate/Authenticate";
import Activate from "./pages/authenticate/Activate/Activate";
import Rooms from "./pages/Rooms/Rooms";

let isAuth = false;
let user = {
  isActivate: true,
};

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        //Guest Area
        <Route
          path="/"
          element={
            isAuth ? (
              !user.isActivate ? (
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
              !user.isActivate ? (
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
              !user.isActivate ? (
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
              !user.isActivate ? (
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
