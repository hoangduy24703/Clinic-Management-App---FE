import { createSlice } from '@reduxjs/toolkit';

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    clickLogout: false,
    role: "",
    id: "",
    register: false
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
    },
    setId: (state, {payload}) => {
      state.id = payload;
    },
    setRegister: (state, {payload}) => {
      state.register = payload;
    }
  }
});

// this is for dispatch
export const { setIsLogin, setClickLogout, setRoleSlice, setId, setRegister } = authReducer.actions;

// this is for configureStore
export default authReducer.reducer;