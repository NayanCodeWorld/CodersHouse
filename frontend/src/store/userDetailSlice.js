import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  avatar: "",
};

export const userDetailSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
  },
});

export const { setName, setAvatar } = userDetailSlice.actions;

export default userDetailSlice.reducer;
