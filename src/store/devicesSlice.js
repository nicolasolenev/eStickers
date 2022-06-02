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
  },
});

export const { addDevice, combineDevices } = devicesSlice.actions;

export default devicesSlice.reducer;
