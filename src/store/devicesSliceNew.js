import { createSlice } from '@reduxjs/toolkit';

import defaultState, { defaultDevice } from './defaultStates';

const initialState = {
  devices: defaultState.devices,
  selected: [],
};

export const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    // addDevice: (state, action) => {
    //   const { id, dinId } = action.payload;
    //   state.devices[id] = { ...defaultDevice, modules: [id], dinId };
    // },
    // deleteDevice: (state, action) => {
    //   const { deviceId } = action.payload;
    //   delete state.devices[deviceId];
    // },
    // toggleWarning: (state, action) => {
    //   const { deviceId } = action.payload;
    //   const device = state.devices[deviceId];
    //   device.warning.text = '';
    //   device.warning.isActive = !device.warning.isActive;
    // },
    // setDeviceInputHeight: (state, action) => {
    //   const { type, currentHeight, deviceId } = action.payload;
    //   state.devices[deviceId][type].height = currentHeight;
    // },
    // updateDeviceText: (state, action) => {
    //   const { deviceId, text, type } = action.payload;
    //   state.devices[deviceId][type].text = text;
    // },
    // toggleDeviceNormallyOn: (state, action) => {
    //   const { deviceId } = action.payload;
    //   const device = state.devices[deviceId];
    //   if (device.normallyOn.isVisible && device.normallyOn.value) {
    //     device.normallyOn.value = false;
    //   } else if (!device.normallyOn.value) {
    //     device.normallyOn.isVisible = false;
    //     device.normallyOn.value = true;
    //   } else {
    //     device.normallyOn.isVisible = true;
    //   }
    // },
    // setDeviceWidth: (state, action) => {
    //   const { deviceId, width } = action.payload;
    //   state.devices[deviceId].width = width;
    // },
    // updateSelected: (state, action) => {
    //   const { deviceId, shift, dins, groups } = action.payload;
    //   if (!shift || state.selected.length === 0) {
    //     if (!state.selected.includes(deviceId)) {
    //       state.selected.push(deviceId);
    //     } else {
    //       state.selected = state.selected.filter((id) => id !== deviceId);
    //     }
    //   } else {
    //     const lastSelectedDeviceId = state.selected[state.selected.length - 1];
    //     const selectedDinId = state.devices[lastSelectedDeviceId].dinId;
    //     const groupsOnDinId = dins[selectedDinId].groups;
    //     const devicesOnDinId = groupsOnDinId
    //       .map((id) => groups[id].devices)
    //       .flat();
    //     const lastSelectedDeviceIndex =
    //       devicesOnDinId.indexOf(lastSelectedDeviceId);
    //     const selectDeviceIndex = devicesOnDinId.indexOf(deviceId);
    //     const interval = [lastSelectedDeviceIndex, selectDeviceIndex].sort(
    //       (a, b) => a - b
    //     );
    //     for (let i = interval[0]; i <= interval[1]; i++) {
    //       if (!state.selected.includes(devicesOnDinId[i])) {
    //         state.selected.push(devicesOnDinId[i]);
    //       }
    //     }
    //   }
    // },
    // combineDevices: (state) => {
    //   const combinedDeviceId = state.selected[0];
    //   const otherDevicesId = state.selected.slice(1);
    //   const combinedDevice = state.devices[combinedDeviceId];
    //   otherDevicesId.forEach((id) => {
    //     combinedDevice.modules.push(...state.devices[id].modules);
    //     combinedDevice.width = combinedDevice.width + state.devices[id].width;
    //     // delete state.devices[id];
    //   });
    //   state.selected = [];
    //   console.log();
    // },
  },
});

export const {
  addDevice,
  deleteDevice,
  toggleWarning,
  setDeviceInputHeight,
  updateDeviceText,
  toggleDeviceNormallyOn,
  setDeviceWidth,
  updateSelected,
  combineDevices,
} = devicesSlice.actions;

export default devicesSlice.reducer;
