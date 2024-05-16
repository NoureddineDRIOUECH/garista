// src/features/restoSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const restoSlice = createSlice({
  name: 'resto',
  initialState: {
    info: {},
  },
  reducers: {
    setRestoInfo: (state, action) => {
      state.info = action.payload;

      localStorage.setItem("restoInformation", JSON.stringify(state.info));
    },
  },
});

export const { setRestoInfo } = restoSlice.actions;

export default restoSlice.reducer;
