import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

import storage from '../storage';
import defaultState, {
  defaultDin,
  defaultGroup,
  defaultDevice,
  defaultModule,
} from './defaultStates';

import {
  getModulesIdOnDin,
  getAllDevicesId,
  getSelectedDevicesId,
  findId,
  recountIndexes,
} from './helpers';

const loadedState = storage.get()?.main;

const initialState = loadedState || {
  dins: defaultState.dins,
  groups: defaultState.groups,
  devices: defaultState.devices,
  modules: defaultState.modules,
  selected: [],
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    addDin: (state, action) => {
      const { id } = action.payload;
      state.dins[id] = { ...defaultDin, groups: [id] };
      state.groups[id] = { ...defaultGroup, devices: [id] };
      state.devices[id] = { ...defaultDevice, modules: [id] };
      state.modules[id] = { ...defaultModule, index: 1 };
    },

    addGroup: (state, action) => {
      const { dinId } = action.payload;

      const modulesOnDin = getModulesIdOnDin(state, dinId);

      const id = nanoid();
      const index = modulesOnDin.length + 1;

      state.modules[id] = { ...defaultModule, index };
      state.devices[id] = { ...defaultDevice, modules: [id] };
      state.groups[id] = { ...defaultGroup, devices: [id] };
      state.dins[dinId].groups.push(id);
    },

    updateSelected: (state, action) => {
      const { deviceId, groupId, dinId, shift } = action.payload;
      const selectedDevicesId = getSelectedDevicesId(state.selected);

      if (!shift || state.selected.length === 0) {
        if (!selectedDevicesId.includes(deviceId)) {
          state.selected.push({
            deviceId,
            groupId,
            dinId,
            backgroundColor: state.groups[groupId].backgroundColor,
            textColor: state.groups[groupId].textColor,
          });
        } else {
          state.selected = state.selected.filter(
            (item) => item.deviceId !== deviceId
          );
        }
      } else {
        const lastSelectedDeviceId =
          selectedDevicesId[selectedDevicesId.length - 1];

        const allDevicesId = getAllDevicesId(state);

        const lastSelectedDeviceIndex =
          allDevicesId.indexOf(lastSelectedDeviceId);

        const selectDeviceIndex = allDevicesId.indexOf(deviceId);

        const interval = [lastSelectedDeviceIndex, selectDeviceIndex].sort(
          (a, b) => a - b
        );

        for (let i = interval[0]; i <= interval[1]; i++) {
          const deviceId = allDevicesId[i];

          if (!selectedDevicesId.includes(deviceId)) {
            const groupId = findId(state, deviceId, 'groups', 'devices');
            const dinId = findId(state, groupId, 'dins', 'groups');

            state.selected.push({
              deviceId,
              groupId,
              dinId,
              backgroundColor: state.groups[groupId].backgroundColor,
              textColor: state.groups[groupId].textColor,
            });
          }
        }
      }
    },

    combineDevices: (state) => {
      const combinedDevice = state.devices[state.selected[0].deviceId];
      const otherDevices = state.selected.slice(1);

      otherDevices.forEach((device) => {
        const id = device.deviceId;
        const otherDevice = state.devices[id];

        combinedDevice.modules.push(...otherDevice.modules);
        combinedDevice.width = (
          Number(combinedDevice.width) + Number(otherDevice.width)
        ).toFixed(1);

        delete state.devices[id];

        if (state.groups[device.groupId].devices.length === 1) {
          delete state.groups[device.groupId];
          state.dins[device.dinId].groups = state.dins[
            device.dinId
          ].groups.filter((groupId) => groupId !== device.groupId);
          if (state.dins[device.dinId].groups.length === 0) {
            delete state.dins[device.dinId];
          }
        } else {
          state.groups[device.groupId].devices = state.groups[
            device.groupId
          ].devices.filter((deviceId) => deviceId !== id);
        }
      });

      recountIndexes(state);
      state.selected = [];
    },

    splitDevices: (state) => {
      state.selected.forEach((item) => {
        const modulesIds = state.devices[item.deviceId].modules;
        if (modulesIds.length < 2) {
          return;
        }

        const newDeviceWidth = (
          state.devices[item.deviceId].width / modulesIds.length
        ).toFixed(1);

        const otherModulesIds = modulesIds.slice(1);
        state.devices[item.deviceId].modules = [modulesIds[0]];
        state.devices[item.deviceId].width = newDeviceWidth;

        const newDevices = {};

        otherModulesIds.forEach((moduleId) => {
          newDevices[nanoid()] = {
            ...defaultDevice,
            width: newDeviceWidth,
            modules: [moduleId],
          };
        });

        state.devices = { ...state.devices, ...newDevices };

        const deviceIdIndex = state.groups[item.groupId].devices.findIndex(
          (deviceId) => deviceId === item.deviceId
        );

        state.groups[item.groupId].devices.splice(
          deviceIdIndex,
          0,
          ...Object.keys(newDevices)
        );
      });

      recountIndexes(state);
      state.selected = [];
    },

    deleteSelectedDevices: (state) => {
      state.selected.forEach((item) => {
        const deviceId = item.deviceId;
        const modulesIds = state.devices[deviceId].modules;
        modulesIds.forEach((moduleId) => delete state.modules[moduleId]);
        delete state.devices[deviceId];
        state.groups[item.groupId].devices = state.groups[
          item.groupId
        ].devices.filter((id) => id !== deviceId);

        if (state.groups[item.groupId].devices.length === 0) {
          delete state.groups[item.groupId];

          state.dins[item.dinId].groups = state.dins[item.dinId].groups.filter(
            (id) => id !== item.groupId
          );
        }

        if (state.dins[item.dinId].groups.length === 0) {
          delete state.dins[item.dinId];
        }
      });

      recountIndexes(state);
      state.selected = [];
    },

    clearSelected: (state) => {
      state.selected = [];
    },

    combineGroups: (state) => {
      const combinedGroupId = state.selected[0].groupId;
      const combinedGroup = state.groups[combinedGroupId];
      const otherDevices = state.selected
        .slice(1)
        .filter((item) => item.groupId !== combinedGroupId);

      otherDevices.forEach((item) => {
        combinedGroup.devices = [...combinedGroup.devices, item.deviceId];

        state.groups[item.groupId].devices = state.groups[
          item.groupId
        ].devices.filter((id) => id !== item.deviceId);

        if (state.groups[item.groupId].devices.length === 0) {
          delete state.groups[item.groupId];
          state.dins[item.dinId].groups = state.dins[item.dinId].groups.filter(
            (id) => id !== item.groupId
          );

          if (state.dins[item.dinId].groups.length === 0) {
            delete state.dins[item.dinId];
          }
        }
      });

      recountIndexes(state);
      state.selected = [];
    },

    splitGroups: (state) => {
      const groups = {};

      state.selected.forEach((item) => {
        groups[item.groupId] = item.dinId;
      });

      for (const groupId in groups) {
        const devicesIds = state.groups[groupId].devices;
        state.groups[groupId].devices = [state.groups[groupId].devices[0]];

        const otherDevicesIds = devicesIds.slice(1);

        const groupIndex = state.dins[groups[groupId]].groups.findIndex(
          (group) => group === groupId
        );
        const newGroups = {};
        otherDevicesIds.forEach((deviceId) => {
          newGroups[nanoid()] = { ...defaultGroup, devices: [deviceId] };
        });

        state.groups = { ...state.groups, ...newGroups };

        state.dins[groups[groupId]].groups.splice(
          groupIndex,
          0,
          ...Object.keys(newGroups)
        );
      }

      recountIndexes(state);
      state.selected = [];
    },

    setDevices: (state, action) => {
      const { dins, groups, devices, modules } = action.payload.devices;

      state.dins = dins;
      state.groups = groups;
      state.devices = devices;
      state.modules = modules;
    },

    setHeight: (state, action) => {
      const { type, height, dinId } = action.payload;
      state.dins[dinId][type] = height;
    },

    setDeviceInputHeight: (state, action) => {
      const { type, currentHeight, deviceId } = action.payload;

      state.devices[deviceId][type].height = currentHeight;
    },

    updateDeviceText: (state, action) => {
      const { deviceId, text, type } = action.payload;
      state.devices[deviceId][type].text = text;
    },

    setGroupInputHeight: (state, action) => {
      const { currentHeight, groupId } = action.payload;

      state.groups[groupId].height = currentHeight;
    },

    // correctHeights: (state, action) => {
    //   const delta = action.payload.delta;
    //   for (const din in state.dins) {
    //     state.dins[din].warningHeight = state.dins[din].warningHeight + delta;
    //     state.dins[din].groupHeight = state.dins[din].groupHeight + delta;
    //     state.dins[din].descriptionHeight =
    //       state.dins[din].descriptionHeight + delta;
    //   }
    // },

    updateGroupText: (state, action) => {
      const { groupId, text } = action.payload;

      state.groups[groupId].text = text;
    },

    toggleDeviceNormallyOn: (state, action) => {
      const { deviceId } = action.payload;

      const device = state.devices[deviceId];

      if (device.normallyOn.isVisible && device.normallyOn.value) {
        device.normallyOn.value = false;
      } else if (!device.normallyOn.value) {
        device.normallyOn.isVisible = false;
        device.normallyOn.value = true;
      } else {
        device.normallyOn.isVisible = true;
      }
    },

    toggleWarning: (state, action) => {
      const { deviceId } = action.payload;
      const device = state.devices[deviceId];
      device.warning.text = '';
      device.warning.isActive = !device.warning.isActive;
    },

    setDeviceWidth: (state, action) => {
      const { deviceId, width } = action.payload;

      const isDeviceInSelected = state.selected.some(
        (item) => item.deviceId === deviceId
      );

      if (state.selected.length !== 0 && isDeviceInSelected) {
        state.selected.forEach((item) => {
          const deviceId = item.deviceId;
          state.devices[deviceId].width = width;
        });
      } else {
        state.devices[deviceId].width = width;
      }
    },
  },
});

export const {
  addDin,
  addGroup,
  updateSelected,
  combineDevices,
  splitDevices,
  deleteSelectedDevices,
  clearSelected,
  combineGroups,
  splitGroups,
  setDevices,
  setHeight,
  setDeviceInputHeight,
  updateDeviceText,
  setGroupInputHeight,
  updateGroupText,
  toggleDeviceNormallyOn,
  toggleWarning,
  setDeviceWidth,
  // correctHeights,
} = mainSlice.actions;

export default mainSlice.reducer;
