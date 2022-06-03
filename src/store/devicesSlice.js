import { createSlice } from '@reduxjs/toolkit';
import { createSingleDevice, SingleDevice } from '../vars';

export const devicesSlice = createSlice({
  name: 'devices',
  initialState: {
    devices: [createSingleDevice()],
  },
  reducers: {
    addDevice: (state) => {
      state.devices.push(createSingleDevice());
    },

    combineDevices: (state, action) => {
      state.devices = action.payload.newDevices;
    },

    updateDevice: (state, action) => {
      const id = action.payload.id;
      state.devices = state.devices.map((device) => {
        if (device.id === id) {
          device.normallyOn = !device.normallyOn;
        }
        return device;
      });
    },

    selectDevice: (state, action) => {
      const id = action.payload.id;
      state.devices = state.devices.map((device) => {
        if (device.id === id) {
          device.selected = !device.selected;
        }
        return device;
      });
    },
  },
});

export const { addDevice, combineDevices, updateDevice, selectDevice } =
  devicesSlice.actions;

export default devicesSlice.reducer;
