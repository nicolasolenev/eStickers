import { createSlice } from '@reduxjs/toolkit';
import { SingleDevice } from '../vars';

export const settingsSlice = createSlice({
  name: 'devices',
  initialState: {
    sequence: false,
    numeration: true,
    selected: [],
  },
  reducers: {
    changeSequence: (state) => {
      state.sequence = !state.sequence;
    },

    setNumeration: (state) => {
      state.numeration = !state.numeration;
    },

    updateSelected: (state, action) => {
      const deviceId = action.payload.deviceId;

      if (state.selected.includes(deviceId)) {
        state.selected.filter((item) => item !== deviceId);
      } else {
        state.selected.push(deviceId);
      }
    },

    clearSelected: (state) => {
      state.selected = [];
    },
  },
});

export const { changeSequence, setNumeration, updateSelected, clearSelected } =
  settingsSlice.actions;

export default settingsSlice.reducer;
