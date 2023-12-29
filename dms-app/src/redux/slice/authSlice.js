import { createSlice } from '@reduxjs/toolkit';

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    clickLogout: false,
    role: "",
  },
  reducers: {
    setIsLogin: (state, {payload}) => {
      state.isLogin = payload;
    },
    setClickLogout: (state, {payload}) => {
      state.clickLogout = payload;
    },
    setRoleSlice: (state, {payload}) => {
      state.role = payload;
    }
  }
});

// this is for dispatch
export const { setIsLogin, setClickLogout, setRoleSlice } = authReducer.actions;

// this is for configureStore
export default authReducer.reducer;