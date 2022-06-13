import { createSlice } from '@reduxjs/toolkit';
import storage from '../storage';

const defaultState = {
  projectName: 'unnamed',
  display: {
    sequence: false,
    numeration: true,
    modulesName: true,
    groups: true,
    switches: true,
    descriptions: true,
    points: true,
  },
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
};

const initialState = storage.get()?.settings || defaultState;

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setProjectName: (state, action) => {
      state.projectName = action.payload;
    },

    setSettings: (state, action) => {
      state = action.payload;
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
        const devicesId = Object.values(devices).map((device) => device.id);
        const lastIdInSelected = state.selected[state.selected.length - 1];
        const indexOfLastSelectedDevice = devicesId.indexOf(lastIdInSelected);
        const indexOfDeviceId = devicesId.indexOf(deviceId);
        const newSelected = new Set(state.selected);

        if (indexOfDeviceId < indexOfLastSelectedDevice) {
          for (let i = indexOfDeviceId; i <= indexOfLastSelectedDevice; i++) {
            newSelected.add(devicesId[i]);
          }
        } else {
          for (let i = indexOfLastSelectedDevice; i <= indexOfDeviceId; i++) {
            newSelected.add(devicesId[i]);
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
