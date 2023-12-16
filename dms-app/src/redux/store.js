import { configureStore } from '@reduxjs/toolkit';
import patientReducer from './slice/patientSlice';

export const store = configureStore({
  reducer: {
    patient: patientReducer
  },
});