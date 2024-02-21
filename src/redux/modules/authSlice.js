import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
    }
  }
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
