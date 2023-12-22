import { configureStore } from '@reduxjs/toolkit';
import patientReducer from './slice/patientSlice';
import authReducer from './slice/authSlice';

export const store = configureStore({
  reducer: {
    patient: patientReducer,
    auth: authReducer,
  },
});