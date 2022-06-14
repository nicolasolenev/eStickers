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

    setSettings: (state, action) => {
      for (let key in state) {
        delete state[key];
      }

      const newState = action.payload;

      for (let key in newState) {
        state[key] = newState[key];
      }
    },

    setPaperWidth: (state, action) => {
      state.paperWidth = action.payload;
    },

    changeTheme: (state, action) => {
      const theme = action.payload;
      state.palette.theme = action.payload;
      if (theme === '8') {
        state.groups = false;
        state.points = false;
        state.modulesName = false;
      } else if (theme === '10') {
        state.groups = true;
        state.points = false;
        state.modulesName = false;
      } else {
        state.groups = true;
        state.points = true;
        state.modulesName = true;
      }
    },

    paletteType: (state, action) => {
      state.palette.type = action.payload;
    },

    paletteChecked: (state, action) => {
      state.palette.checked[action.payload] =
        !state.palette.checked[action.payload];
    },

    toggleVisability: (state, action) => {
      const fields = action.payload;

      state.display[fields] = !state.display[fields];
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
          if (
            minCount <= devices[deviceId].count &&
            devices[deviceId].count <= maxCount
          ) {
            newSelected.add(devices[deviceId].id);
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
  setNumeration,
  updateSelected,
  clearSelected,
  paletteType,
  paletteChecked,
  changeTheme,
  toggleVisability,
  setPaperWidth,
  setSettings,
  setProjectName,
} = settingsSlice.actions;

export default settingsSlice.reducer;
