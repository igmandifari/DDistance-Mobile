import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticed: (state, { payload }) => {
      state.isAuthenticated = payload;
    },
  },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default authSlice.reducer;
