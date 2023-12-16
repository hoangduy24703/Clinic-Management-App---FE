import { createSlice } from '@reduxjs/toolkit';

export const patientReducer = createSlice({
  name: "patient",
  initialState: {
    selectedItem: "",
  },
  reducers: {
    setPatientSelected: (state, {payload}) => {
      state.selectedItem = payload;
    }
  }
});

// this is for dispatch
export const { setPatientSelected } = patientReducer.actions;

// this is for configureStore
export default patientReducer.reducer;