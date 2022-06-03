import { createSlice } from '@reduxjs/toolkit';
import { createSingleDevice, SingleDevice } from '../vars';

const initialDevice = createSingleDevice();

const example = {
  id: 0,
  group: 'Где?',
  normallyOn: true,
  switch: 'QF1',
  description: 'Надпись, название линии',
  modules: [{ moduleName: 'L1', width: 18, id: 0 }],
  warning: '',
  selected: false,
};

export const devicesSlice = createSlice({
  name: 'devices',
  initialState: {
    [initialDevice.id]: initialDevice,
  },
  reducers: {
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
      const id = action.payload.id;
      state[id].normallyOn = !state[id].normallyOn;
    },

    selectDevice: (state, action) => {
      const id = action.payload.id;
      state[id].selected = !state[id].selected;
    },

    updateDeviceText: (state, action) => {
      const device = state[action.payload.id];
      const text = action.payload.text;

      device[action.payload.key] = text;
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
