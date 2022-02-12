import { createSlice } from "@reduxjs/toolkit";
const initialValue = null;

const authSlice = createSlice({
  name: "auth",
  initialState: initialValue,
  reducers: {
    googleLogin: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return action.payload;
    },
    logout: (state, action) => {
      localStorage.clear();
      return null;
    },
    signup: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return action.payload;
    },
    signin: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return action.payload;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
export const { googleLogin, signup, signin, logout } = authSlice.actions;
