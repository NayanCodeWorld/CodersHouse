import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import userDetails from "./userDetailSlice";

export const store = configureStore({
  reducer: { auth, userDetails },
});
