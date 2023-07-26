import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  name: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log("action", action);
      state.isLoggedIn = true;
      state.name = action.payload.name;
      state.token = action.payload.token;
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.name = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
