import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    type: '',
    prevModal: '',
  },
  reducers: {
    setModal: (state, action) => {
      for (const key in action.payload) {
        state[key] = action.payload[key];
      }
    },
  },
});

export const { setModal } = modalSlice.actions;

export default modalSlice.reducer;
