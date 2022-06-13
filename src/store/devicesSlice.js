import { createSlice } from '@reduxjs/toolkit';
import { createSingleDevice, getMaxDescriptionHeight } from '../functions';
import THEME from '../theme';

const initialDevice = createSingleDevice();

export const devicesSlice = createSlice({
  name: 'devices',
  initialState: {
    [initialDevice.id]: initialDevice,
  },
  reducers: {
    setHeight: (state, action) => {
      const { currentHeight, deviceId, type } = action.payload;

      state[deviceId][type].height = currentHeight;
    },

    toggleWarning: (state, action) => {
      const deviceId = action.payload;

      state[deviceId].warning.text = '';
      state[deviceId].warning.isActive = !state[deviceId].warning.isActive;
    },

    applyTheme: (state, action) => {
      const { themeName } = action.payload;

      if (themeName === '10') {
      } else {
        for (let device in state) {
          for (let key in state[device]) {
            if (key !== 'id') {
              state[device][key].backgroundColor =
                THEME[themeName].deviceBackground;
            }
          }
        }
      }
    },

    changeColor: (state, action) => {
      const { selected, color, type, fields } = action.payload;

      selected.forEach((deviceId) => {
        for (let key in fields) {
          if (fields[key]) {
            state[deviceId][key][type] = color;
          }
        }
      });
    },

    addDevice: (state, action) => {
      const newDevice = createSingleDevice(action.payload);

      state[newDevice.id] = newDevice;
    },

    combineDevices: (state, action) => {
      const selected = [...action.payload.selected];
      const combinedDeviceId = selected.shift();
      const combinedDeviceModules = state[combinedDeviceId].modules.value;

      selected.forEach((id) => {
        combinedDeviceModules.push(...state[id].modules.value);
        delete state[id];
      });
    },

    combineGroups: (state, action) => {
      const selected = [...action.payload];
      const combinedGroupId = state[selected.shift()].groupId;
      selected.forEach((deviceId) => {
        state[deviceId].groupId = combinedGroupId;
      });
    },

    toggleDeviceNormallyOn: (state, action) => {
      const id = action.payload.deviceId;
      state[id].normallyOn.value = !state[id].normallyOn.value;
    },

    updateDeviceText: (state, action) => {
      const device = state[action.payload.deviceId];
      const text = action.payload.text;

      device[action.payload.key].text = text;
    },

    setModuleName: (state, action) => {
      const { name, deviceId, moduleId } = action.payload;
      const device = state[deviceId];
      const moduleIndex = device.modules.value.findIndex(
        (module) => module.id === moduleId
      );

      device.modules.value[moduleIndex].moduleName = name;
    },

    setModuleWidth: (state, action) => {
      const { width, deviceId, moduleId, selected } = action.payload;
      const ModeratedWidth = width < 8 ? 8 : width;
      const device = state[deviceId];
      const moduleIndex = device.modules.value.findIndex(
        (module) => module.id === moduleId
      );

      if (selected.length && selected.includes(deviceId)) {
        selected.forEach((deviceId) => {
          state[deviceId].modules.value.forEach((module) => {
            module.width = ModeratedWidth;
          });
        });
      } else {
        device.modules.value[moduleIndex].width = ModeratedWidth;
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
  updateDeviceText,
  setModuleWidth,
  setModuleName,
  deleteDevice,
  changeColor,
  applyTheme,
  toggleWarning,
  setHeight,
  combineGroups,
} = devicesSlice.actions;

export default devicesSlice.reducer;
