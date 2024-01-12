import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: true,
  role: null,
  token: null,
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuthentication: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    logout: (state, action) => {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const { setIsAuthentication, logout, setUser } = userSlice.actions;

export default userSlice.reducer;
