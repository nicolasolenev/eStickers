import { createSlice } from '@reduxjs/toolkit';

export const settingsSlice = createSlice({
  name: 'devices',
  initialState: {
    sequence: false,
    numeration: true,
    modulesName: true,
    groups: true,
    selected: [],
    palette: {
      theme: '',
      type: 'backgroundColor',
      checked: {
        warning: false,
        group: true,
        switch: true,
      },
    },
  },
  reducers: {
    changeTheme: (state, action) => {
      state.palette.theme = action.payload;
    },

    paletteType: (state, action) => {
      state.palette.type = action.payload;
    },

    paletteChecked: (state, action) => {
      state.palette.checked[action.payload] =
        !state.palette.checked[action.payload];
    },

    changeSequence: (state) => {
      state.sequence = !state.sequence;
    },

    setNumeration: (state) => {
      state.numeration = !state.numeration;
    },

    modulesNameVisability: (state) => {
      state.modulesName = !state.modulesName;
    },

    groupsVisability: (state) => {
      state.groups = !state.groups;
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

export const {
  changeSequence,
  setNumeration,
  modulesNameVisability,
  groupsVisability,
  updateSelected,
  clearSelected,
  paletteType,
  paletteChecked,
  changeTheme,
} = settingsSlice.actions;

export default settingsSlice.reducer;
