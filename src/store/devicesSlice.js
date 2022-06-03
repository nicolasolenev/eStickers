import { createSlice } from '@reduxjs/toolkit';
import { createSingleDevice } from '../functions';

const initialDevice = createSingleDevice();

export const devicesSlice = createSlice({
  name: 'devices',
  initialState: {
    [initialDevice.id]: initialDevice,
  },
  reducers: {
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

      device[action.payload.key] = text;
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
      const { width, deviceId, moduleId } = action.payload;
      const device = state[deviceId];
      const moduleIndex = device.modules.findIndex(
        (module) => module.id === moduleId
      );

      device.modules[moduleIndex].width = width;
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
} = devicesSlice.actions;

export default devicesSlice.reducer;
