import { createSlice } from '@reduxjs/toolkit';
import storage from '../storage';
import { defaultSettingsState } from '../vars';

const initialState = storage.get()?.settings || defaultSettingsState;

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setUsersTheme: (state, action) => {
      state.usersTheme = action.payload.usersTheme;
    },

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
      const { settings } = action.payload;

      for (let key in settings) {
        state[key] = settings[key];
      }
    },

    setDevicesHeight: (state, action) => {
      const height = action.payload.height;
      state.devicesHeight = height;
    },
  },
});

export const {
  toggleVisability,
  setPaperWidth,
  setSettings,
  setProjectName,
  setPaletteValue,
  setUsersTheme,
  setDevicesHeight,
} = settingsSlice.actions;

export default settingsSlice.reducer;
