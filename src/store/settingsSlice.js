import { createSlice } from '@reduxjs/toolkit';
import storage from '../storage';
import { defaultSettingsState } from '../vars';

const initialState = storage.get()?.settings || defaultSettingsState;

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setProjectName: (state, action) => {
      state.projectName = action.payload;
    },

    toggleVisability: (state, action) => {
      const fields = action.payload;

      state.display[fields] = !state.display[fields];
    },

    setPaperWidth: (state, action) => {
      state.paperWidth = action.payload;
    },

    setPaletteValue: (state, action) => {
      for (const key in action.payload) {
        state.palette[key] = action.payload[key];
      }
    },

    setSettings: (state, action) => {
      const newState = action.payload;

      for (let key in newState) {
        state[key] = newState[key];
      }
    },

    updateSelected: (state, action) => {
      const { deviceId, devices, shift } = action.payload;
      const isSelectedNotEmpty = state.selected.length;

      if (shift && isSelectedNotEmpty) {
        const countDevice = devices[deviceId].count;
        const lastIdInSelected = state.selected[state.selected.length - 1];
        const countLastSelectedDevice = devices[lastIdInSelected].count;
        const newSelected = new Set(state.selected);
        const maxCount = Math.max(countDevice, countLastSelectedDevice);
        const minCount = Math.min(countDevice, countLastSelectedDevice);

        for (const deviceId in devices) {
          const device = devices[deviceId];
          const deviceCount = device.count;
          const betweenAllocated =
            minCount <= deviceCount && deviceCount <= maxCount;

          if (betweenAllocated) {
            newSelected.add(device.id);
          }
        }
        state.selected = [...newSelected];
      } else {
        if (state.selected.includes(deviceId)) {
          state.selected = state.selected.filter((item) => item !== deviceId);
        } else {
          state.selected.push(deviceId);
        }
      }
    },

    clearSelected: (state) => {
      state.selected = [];
    },
  },
});

export const {
  updateSelected,
  clearSelected,
  toggleVisability,
  setPaperWidth,
  setSettings,
  setProjectName,
  setPaletteValue,
} = settingsSlice.actions;

export default settingsSlice.reducer;
