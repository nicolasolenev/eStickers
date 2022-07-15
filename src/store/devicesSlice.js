import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

import { findGroup, findDevice, getDevices } from '../functions';
import { createGroup, createSingleDevice } from '../vars';
import storage from '../storage';
import THEME from '../theme';

const loadedGroups = storage.get()?.devices;

const isLoadedStateNotEmpty = loadedGroups?.length;

const initialState = {
  groups: isLoadedStateNotEmpty ? loadedGroups : [createGroup()],
  selected: [],
};

export const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    setGroups: (state, action) => {
      const { groups } = action.payload;
      const defaultGroups = [createGroup()];
      state.groups = groups || defaultGroups;
      state.selected = [];
    },

    addGroup: (state, action) => {
      const { theme } = action.payload;
      state.groups.push(createGroup(theme));
    },

    addDeviceBefore: (state, action) => {
      const { theme, groupIndex, index } = action.payload;
      const group = state.groups[groupIndex];

      if (index === 0) {
        group.devices.unshift(createSingleDevice(theme));
      } else {
        group.devices.splice(index, 0, createSingleDevice(theme));
      }
    },

    updateSelected: (state, action) => {
      const { groupId, deviceId, shift } = action.payload;
      const isSelectedNotEmpty = state.selected.length;

      if (shift && isSelectedNotEmpty) {
        const deviceAndGroupIds = [].concat(
          ...state.groups.map((group) => {
            const groupId = group.id;
            const backgroundColor = group.backgroundColor;
            const textColor = group.textColor;

            return group.devices.map((device) => {
              return {
                groupId,
                deviceId: device.id,
                backgroundColor,
                textColor,
              };
            });
          })
        );

        const selectedDevicesIds = state.selected.map((item) => item.deviceId);

        const devicesIds = deviceAndGroupIds.map((item) => item.deviceId);

        const lastSelectedDeviceId =
          selectedDevicesIds[selectedDevicesIds.length - 1];

        const lastSelectedDeviceIndex =
          devicesIds.indexOf(lastSelectedDeviceId);

        const selectDeviceIndex = devicesIds.indexOf(deviceId);

        const interval = [lastSelectedDeviceIndex, selectDeviceIndex].sort(
          (a, b) => a - b
        );

        deviceAndGroupIds
          .slice(interval[0], interval[1] + 1)
          .forEach((item) => {
            if (
              !state.selected
                .map((item) => item.deviceId)
                .includes(item.deviceId)
            ) {
              state.selected.push(item);
            }
          });
      } else {
        if (state.selected.map((item) => item.deviceId).includes(deviceId)) {
          state.selected = state.selected.filter(
            (item) => item.deviceId !== deviceId
          );
        } else {
          const group = findGroup(state.groups, groupId);

          const backgroundColor = group.backgroundColor;
          const textColor = group.textColor;

          state.selected.push({
            deviceId,
            groupId,
            backgroundColor,
            textColor,
          });
        }
      }
    },

    deleteSelectedDevices: (state) => {
      state.selected.forEach((item) => {
        state.groups = state.groups.map((group) => {
          if (group.id === item.groupId) {
            return Object.assign({}, group, {
              devices: group.devices.filter(
                (device) => device.id !== item.deviceId
              ),
            });
          }
          return group;
        });

        state.groups = state.groups.filter((group) => group.devices.length > 0);
      });

      state.selected = [];
    },

    combineGroups: (state) => {
      const combinedGroupIndex = state.groups
        .map((group) => group.id)
        .indexOf(state.selected[0].groupId);

      const devices = getDevices(state.groups);

      state.selected.slice(1).forEach((item) => {
        if (
          !state.groups[combinedGroupIndex].devices
            .map((device) => device.id)
            .includes(item.deviceId)
        ) {
          state.groups[combinedGroupIndex].devices.push(
            devices.find((device) => device.id === item.deviceId)
          );
        }
      });

      state.selected.slice(1).forEach((item) => {
        const combinedGroupIndex = state.groups
          .map((group) => group.id)
          .indexOf(state.selected[0].groupId);

        if (state.groups[combinedGroupIndex].id !== item.groupId) {
          const groupIndex = state.groups
            .map((group) => group.id)
            .indexOf(item.groupId);

          if (state.groups[groupIndex].devices.length <= 1) {
            state.groups = state.groups.filter(
              (group) => group.id !== state.groups[groupIndex].id
            );
          } else
            state.groups[groupIndex].devices = state.groups[
              groupIndex
            ].devices.filter(
              (device) =>
                !state.selected.map((item) => item.deviceId).includes(device.id)
            );
        }
      });

      state.selected = [];
    },

    splitGroups: (state) => {
      const selected = state.selected.map((item) => item.groupId);
      const selectedGroups = new Set(selected);
      selectedGroups.forEach((groupId) => {
        const groupIndex = state.groups
          .map((group) => group.id)
          .indexOf(groupId);

        const devices = state.groups[groupIndex].devices;

        const splitedGroups = devices.map((device) => {
          return Object.assign({}, state.groups[groupIndex], {
            devices: [device],
            id: nanoid(),
          });
        });

        state.groups.splice(groupIndex, 1, ...splitedGroups);
      });

      state.selected = [];
    },

    combineDevices: (state) => {
      const { groupId, deviceId } = state.selected[0];
      const group = findGroup(state.groups, groupId);
      const combinedDevice = findDevice(state.groups, groupId, deviceId, group);

      state.selected.slice(1).forEach((item) => {
        const device = findDevice(state.groups, item.groupId, item.deviceId);
        const modules = device.modules;

        combinedDevice.modules.module.push(...modules.module);

        combinedDevice.modules.width =
          Number(combinedDevice.modules.width) + Number(modules.width);
      });

      const moduleWidth =
        combinedDevice.modules.width / combinedDevice.modules.module.length;

      combinedDevice.modules.module.forEach((module) => {
        module.width = moduleWidth;
      });

      state.selected.slice(1).forEach((item) => {
        if (item.groupId !== state.selected[0].groupId) {
          const group = findGroup(state.groups, item.groupId);

          if (group.devices.length <= 1) {
            state.groups.splice(state.groups.indexOf(group), 1);
          } else {
            group.devices.splice(
              group.devices.findIndex((device) => device.id === item.deviceId),
              1
            );
          }
        } else {
          group.devices.splice(
            group.devices.findIndex((device) => device.id === item.deviceId),
            1
          );
        }
      });

      state.selected = [];
    },

    splitDevices: (state) => {
      state.selected.forEach((item) => {
        const group = findGroup(state.groups, item.groupId);
        const device = findDevice(
          state.groups,
          item.groupId,
          item.deviceId,
          group
        );

        const modules = device.modules.module;

        if (modules.length > 1) {
          const newDevices = modules.map((module) => {
            return Object.assign({}, device, {
              modules: { width: module.width, module: [module] },
              id: nanoid(),
            });
          });

          const devices = group.devices;

          devices.splice(
            devices.findIndex((device) => device.id === item.deviceId),
            1,
            ...newDevices
          );
        }
      });

      state.selected = [];
    },

    setModuleWidth: (state, action) => {
      const { width, deviceId, groupId } = action.payload;
      const moderatedWidth = width < 8 ? 8 : width;

      if (
        state.selected.length &&
        state.selected.map((item) => item.deviceId).includes(deviceId)
      ) {
        state.selected.forEach((item) => {
          const device = findDevice(state.groups, item.groupId, item.deviceId);

          const modulesCount = device.modules.module.length;

          const moduleWidth =
            Math.round((moderatedWidth / modulesCount) * 10) / 10;

          device.modules.width = moderatedWidth;

          device.modules.module.forEach((module) => {
            module.width = moduleWidth;
          });
        });
      } else {
        const device = findDevice(state.groups, groupId, deviceId);
        const modulesCount = device.modules.module.length;
        const moduleWidth =
          Math.round((moderatedWidth / modulesCount) * 10) / 10;

        device.modules.width = moderatedWidth;

        device.modules.module.forEach((module) => {
          module.width = moduleWidth;
        });
      }
    },

    toggleDeviceNormallyOn: (state, action) => {
      const { deviceId, groupId } = action.payload;
      const device = findDevice(state.groups, groupId, deviceId);

      if (device.normallyOn.isVisible && device.normallyOn.value) {
        device.normallyOn.value = false;
      } else if (!device.normallyOn.value) {
        device.normallyOn.isVisible = false;
        device.normallyOn.value = true;
      } else {
        device.normallyOn.isVisible = true;
      }
    },

    clearSelected: (state) => {
      state.selected = [];
    },

    updateDeviceText: (state, action) => {
      const { deviceId, groupId, text, key } = action.payload;

      if (key === 'group') {
        const group = findGroup(state.groups, groupId);
        group.text = text;
      } else {
        const device = findDevice(state.groups, groupId, deviceId);

        device[key].text = text;
      }
    },

    setHeight: (state, action) => {
      const { currentHeight, deviceId, groupId, type } = action.payload;

      if (type === 'group') {
        const group = findGroup(state.groups, groupId);
        group.height = currentHeight;
      } else {
        const device = findDevice(state.groups, groupId, deviceId);
        device[type].height = currentHeight;
      }
    },

    toggleWarning: (state, action) => {
      const { deviceId, groupId } = action.payload;
      const device = findDevice(state.groups, groupId, deviceId);
      device.warning.text = '';
      device.warning.isActive = !device.warning.isActive;
    },

    setModuleText: (state, action) => {
      const { text, groupId, deviceId, moduleId } = action.payload;
      const device = findDevice(state.groups, groupId, deviceId);
      const module = device.modules.module.find(
        (module) => module.id === moduleId
      );

      module.text = text;
    },

    changeColor: (state, action) => {
      const { color, type, isWarningColor } = action.payload;
      if (!isWarningColor) {
        const selectedGroups = [
          ...new Set(state.selected.map((item) => item.groupId)),
        ];

        state.groups.forEach((group) => {
          if (selectedGroups.includes(group.id)) {
            group[type] = color;
          }
        });
      } else {
        const devices = getDevices(state.groups);
        const selectedDevices = state.selected.map((item) => item.deviceId);
        devices.forEach((device) => {
          if (selectedDevices.includes(device.id)) {
            device.warning.backgroundColor = color[0];
            device.warning.textColor = color[1];
          }
        });
      }
    },

    applyTheme: (state, action) => {
      const { themeName } = action.payload;
      let count = 0;

      state.groups.forEach((group) => {
        if (count === THEME[themeName].length) {
          count = 0;
        }

        group.backgroundColor = THEME[themeName][count].groupBackground;
        group.textColor = THEME[themeName][count].groupColor;
        count++;
      });
    },

    applyUsersTheme: (state, action) => {
      const { theme } = action.payload;

      state.groups.forEach((group) => {
        const isThemeExist = Object.keys(theme).includes(group.id);
        if (isThemeExist) {
          group.backgroundColor = theme[group.id].backgroundColor;
          group.textColor = theme[group.id].textColor;
        }
      });
    },

    applyRandomColors: (state, action) => {
      const { colors, inversion } = action.payload;

      state.groups.forEach((group, index) => {
        if (group.devices.length > 1) {
          if (inversion) {
            group.backgroundColor = colors[index].textColor;
            group.textColor = colors[index].backgroundColor;
          } else {
            group.backgroundColor = colors[index].backgroundColor;
            group.textColor = colors[index].textColor;
          }
        }
      });
    },
  },
});

export const {
  addGroup,
  addDeviceBefore,
  setGroups,
  updateSelected,
  deleteSelectedDevices,
  combineGroups,
  splitGroups,
  combineDevices,
  splitDevices,
  setModuleWidth,
  toggleDeviceNormallyOn,
  clearSelected,
  updateDeviceText,
  setHeight,
  toggleWarning,
  setModuleText,
  changeColor,
  applyTheme,
  applyUsersTheme,
  applyRandomColors,
} = devicesSlice.actions;

export default devicesSlice.reducer;
