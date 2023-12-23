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
  },
});

export const { setIsAuthentication, setToken } = userSlice.actions;

export default userSlice.reducer;
