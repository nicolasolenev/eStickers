import { createSingleDevice } from './vars';

export function getClasses(defaultClass, classes) {
  let resultClass = defaultClass;
  for (const key in classes) {
    if (classes[key]) {
      resultClass += ' ' + key;
    }
  }

  return resultClass;
}

export function windowListenerHandler(
  e,
  {
    dispatch,
    selected,
    deleteSelectedDevices,
    clearSelected,
    history,
    setGroups,
    setSettings,
    popState,
    pushState,
    groups,
    settings,
  }
) {
  const deleteKeyCombination =
    (e.key === 'Delete' || e.key === 'Backspace') && e.shiftKey;

  const deselection = e.key === 'Escape';

  const ctrlZ = e.key === 'z' && e.ctrlKey;

  if (deleteKeyCombination) {
    dispatch(deleteSelectedDevices());
    dispatch(pushState({ groups, settings }));
  }
  if (deselection) {
    dispatch(clearSelected());
  }
  if (ctrlZ) {
    const prevState = history[history.length - 1];
    if (prevState) {
      const groups = prevState.groups;
      const settings = prevState.settings;

      dispatch(setGroups({ groups }));
      dispatch(setSettings(settings));
      dispatch(popState({ groups, settings }));
    }
  }
}

export function getGroupWidth(group) {
  return group.devices.reduce((sum, device) => {
    return sum + getDeviceTotalWidth(device);
  }, 0);
}

export function createGroup(theme) {
  const initialDevice = createSingleDevice(theme);

  return {
    id: Number(new Date()),
    text: '',
    backgroundColor: '#f2f2f2',
    height: '29px',
    devices: {
      [initialDevice.id]: initialDevice,
    },
  };
}

export function getDevices(groups) {
  const devices = [].concat(...groups.map((group) => group.devices));

  return devices;
}

export function getDeviceTotalWidth(device) {
  const width = device.modules.module.reduce(
    (total, module) => total + Number(module.width),
    0
  );

  return width;
}

export function getDevicesWidth(groups) {
  const devices = getDevices(groups);

  const width = devices
    .map((device) => device.modules.width)
    .reduce((sum, width) => sum + Number(width), 0);

  return Math.round(width * 10) / 10;
}

export function getMaxInputHeight(groups, type) {
  let maxHeight = 12;

  if (type === 'group') {
    groups.forEach((group) => {
      if (group.height > maxHeight) {
        maxHeight = group.height;
      }
    });
  } else {
    const devices = [].concat(...groups.map((group) => group.devices));

    devices.forEach((device) => {
      if (device[type].height > maxHeight) {
        maxHeight = device[type].height;
      }
    });
  }

  return maxHeight;
}

export function getGroups(devices) {
  let groupsId = Object.values(devices).map((device) => device.groupId);
  groupsId = new Set(groupsId);

  const groups = {};
  groupsId.forEach((id) => {
    groups[id] = [];
  });

  Object.values(devices).forEach((device) => {
    groups[device.groupId].push(device.id);
  });
  return groups;
}

export function findGroup(groups, id) {
  return groups.find((group) => group.id === id);
}

export function findDevice(groups, groupId, deviceId, foundGroup) {
  if (foundGroup) {
    return foundGroup.devices.find((device) => device.id === deviceId);
  }

  return findGroup(groups, groupId).devices.find(
    (device) => device.id === deviceId
  );
}

export function getUsersTheme(groups) {
  const usersTheme = {};

  groups.forEach((group) => {
    usersTheme[group.id] = {
      backgroundColor: group.backgroundColor,
      textColor: group.textColor,
    };
  });

  return usersTheme;
}

export function getUsersColors(usersTheme) {
  const usersColors = new Set();

  for (const group in usersTheme) {
    usersColors.add(usersTheme[group].backgroundColor);
    usersColors.add(usersTheme[group].textColor);
  }

  return [...usersColors];
}

export function randomInteger(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
