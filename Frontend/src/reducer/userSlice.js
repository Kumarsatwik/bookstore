import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.user = [];
      state.isLoggedIn = false;
      localStorage.removeItem("_user");
      localStorage.removeItem("_token");
    },
  },
});
export const { login, logout } = userSlice.actions;
export default userSlice;
