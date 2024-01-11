import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: true,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuthentication: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const { setIsAuthentication, setToken, logout } = userSlice.actions;

export default userSlice.reducer;
