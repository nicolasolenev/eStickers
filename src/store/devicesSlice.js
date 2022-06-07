import { createSlice } from '@reduxjs/toolkit';
import { createSingleDevice } from '../functions';

const initialDevice = createSingleDevice();

export const devicesSlice = createSlice({
  name: 'devices',
  initialState: {
    [initialDevice.id]: initialDevice,
  },
  reducers: {
    changeColor: (state, action) => {
      const { selected, color, type, fields } = action.payload;

      selected.forEach((deviceId) => {
        for (let key in fields) {
          if (fields[key]) {
            if (type === 'backgroundColor') {
              state[deviceId].background = color;
            } else {
              state[deviceId][key][type] = color;
            }
          }
        }
      });
    },

    clearAllSelected: (state) => {
      for (let deviceId in state) {
        state[deviceId].selected = false;
      }
    },

    addDevice: (state) => {
      const newDevice = createSingleDevice();
      state[newDevice.id] = newDevice;
    },

    combineDevices: (state, action) => {
      const selected = [...action.payload.selected];
      const combinedDeviceId = selected.shift();
      const combinedDeviceModules = state[combinedDeviceId].modules;

      selected.forEach((id) => {
        combinedDeviceModules.push(...state[id].modules);
        delete state[id];
      });

      state[combinedDeviceId].selected = false;
    },

    toggleDeviceNormallyOn: (state, action) => {
      const id = action.payload.deviceId;
      state[id].normallyOn = !state[id].normallyOn;
    },

    selectDevice: (state, action) => {
      const id = action.payload.deviceId;
      state[id].selected = !state[id].selected;
    },

    updateDeviceText: (state, action) => {
      const device = state[action.payload.deviceId];
      const text = action.payload.text;

      device[action.payload.key].text = text;
    },

    setModuleName: (state, action) => {
      const { name, deviceId, moduleId } = action.payload;
      const device = state[deviceId];
      const moduleIndex = device.modules.findIndex(
        (module) => module.id === moduleId
      );

      device.modules[moduleIndex].moduleName = name;
    },

    setModuleWidth: (state, action) => {
      const { width, deviceId, moduleId, selected } = action.payload;
      const device = state[deviceId];
      const moduleIndex = device.modules.findIndex(
        (module) => module.id === moduleId
      );

      if (selected.length) {
        selected.forEach((deviceId) => {
          state[deviceId].modules.forEach((module) => {
            module.width = width;
          });
        });
      } else {
        device.modules[moduleIndex].width = width;
      }
    },

    deleteDevice: (state, action) => {
      const id = action.payload.deviceId;
      delete state[id];
    },
  },
});

export const {
  addDevice,
  combineDevices,
  toggleDeviceNormallyOn,
  selectDevice,
  updateDeviceText,
  setModuleWidth,
  setModuleName,
  deleteDevice,
  changeColor,
  clearAllSelected,
} = devicesSlice.actions;

export default devicesSlice.reducer;
