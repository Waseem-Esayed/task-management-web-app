import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    username: "",
    isDemo: false,
    justLoggedOut: false,
  },
  reducers: {
    setAuth: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.username = action.payload.username;
      state.justLoggedOut = false;
    },
    setDemo: (state) => {
      state.isDemo = true;
      state.username = "Demo User";
    },
    logout: (state) => {
      state.isDemo = false;
      state.isLoggedIn = false;
      state.username = "";
      state.justLoggedOut = true;
    },
  },
});

export const { setAuth, setDemo, logout } = authSlice.actions;
export default authSlice.reducer;
