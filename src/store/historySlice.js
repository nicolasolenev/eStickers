import { createSlice } from '@reduxjs/toolkit';

export const historySlice = createSlice({
  name: 'history',
  initialState: [],
  reducers: {
    pushState: (state, action) => {
      if (state.length >= 20) {
        state.shift();
      }
      state.push(action.payload);
    },
    popState: (state) => {
      state.pop();
    },
  },
});

export const { pushState, popState } = historySlice.actions;

export default historySlice.reducer;
