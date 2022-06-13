import { createSlice } from '@reduxjs/toolkit';
import { createSingleDevice, getMaxDescriptionHeight } from '../functions';
import THEME from '../theme';
import storage from '../storage';

const initialDevice = createSingleDevice();

const defaultState = {
  [initialDevice.id]: initialDevice,
};

const loadedState = storage.get()?.devices;
const isLoadedStateNotEmpty = loadedState && Object.values(loadedState).length;

const initialState = isLoadedStateNotEmpty ? loadedState : defaultState;

export const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    setDevices: (state, action) => {
      for (let deviceId in state) {
        delete state[deviceId];
      }

      const newState = action.payload;

      for (let deviceId in newState) {
        state[deviceId] = newState[deviceId];
      }
    },

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
      const { selected, color, type } = action.payload;

      const selectedGroups = [
        ...new Set(selected.map((deviceId) => state[deviceId].groupId)),
      ];

      // selectedGroups.forEach((deviceId) => {
      //   state[deviceId][type] = color;
      // });

      for (const deviceId in state) {
        if (selectedGroups.includes(state[deviceId].groupId)) {
          state[deviceId][type] = color;
        }
      }
    },

    addDevice: (state, action) => {
      const newDevice = createSingleDevice(action.payload);

      state[newDevice.id] = newDevice;
    },

    combineDevices: (state, action) => {
      const selected = [...action.payload.selected];

      const totalWidth = selected
        .map((deviceId) => state[deviceId].modules.totalWidth)
        .reduce((sum, width) => sum + Number(width), 0);

      const combinedDeviceId = selected.shift();

      const combinedDevice = state[combinedDeviceId];

      const combinedDeviceModules = combinedDevice.modules.value;

      selected.forEach((id) => {
        combinedDeviceModules.push(...state[id].modules.value);
        delete state[id];
      });

      combinedDevice.modules.totalWidth = totalWidth;

      const modulesCount = combinedDevice.modules.value.length;

      const moduleWidth = Math.round((totalWidth / modulesCount) * 10) / 10;

      combinedDevice.modules.value.forEach((module) => {
        module.width = moduleWidth;
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
      const { width, deviceId, selected } = action.payload;
      const moderatedWidth = width < 8 ? 8 : width;

      if (selected.length && selected.includes(deviceId)) {
        selected.forEach((deviceId) => {
          const modulesCount = state[deviceId].modules.value.length;
          const moduleWidth =
            Math.round((moderatedWidth / modulesCount) * 10) / 10;

          state[deviceId].modules.totalWidth = moderatedWidth;

          state[deviceId].modules.value.forEach((module) => {
            module.width = moduleWidth;
          });
        });
      } else {
        const device = state[deviceId];

        device.modules.totalWidth = moderatedWidth;

        const modulesCount = state[deviceId].modules.value.length;
        const moduleWidth =
          Math.round((moderatedWidth / modulesCount) * 10) / 10;

        device.modules.value.forEach((module) => {
          module.width = moduleWidth;
        });
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
  setDevices,
} = devicesSlice.actions;

export default devicesSlice.reducer;
