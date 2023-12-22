import { createSlice } from '@reduxjs/toolkit';

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
  },
  reducers: {
    setIsLogin: (state, {payload}) => {
      state.isLogin = payload;
    }
  }
});

// this is for dispatch
export const { setIsLogin } = authReducer.actions;

// this is for configureStore
export default authReducer.reducer;