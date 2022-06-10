import { createSlice } from '@reduxjs/toolkit';

export const settingsSlice = createSlice({
  name: 'devices',
  initialState: {
    sequence: false,
    numeration: true,
    modulesName: true,
    groups: true,
    switches: true,
    descriptions: true,
    points: true,
    paperWidth: 297,
    selected: [],
    palette: {
      theme: '',
      type: '',
      checked: {
        warning: false,
        group: true,
        normallyOn: true,
        switch: true,
        description: true,
        modules: true,
      },
    },
  },
  reducers: {
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

      state[fields] = !state[fields];
    },

    updateSelected: (state, action) => {
      const deviceId = action.payload.deviceId;

      if (state.selected.includes(deviceId)) {
        state.selected = state.selected.filter((item) => item !== deviceId);
      } else {
        state.selected.push(deviceId);
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
} = settingsSlice.actions;

export default settingsSlice.reducer;
