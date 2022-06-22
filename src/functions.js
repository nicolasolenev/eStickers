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
    deleteDevice,
    clearSelected,
    history,
    setDevices,
    setSettings,
    popState,
  }
) {
  const deleteKeyCombination =
    (e.key === 'Delete' || e.key === 'Backspace') && e.shiftKey;

  const deselection = e.key === 'Escape';

  const ctrlZ = e.key === 'z' && e.ctrlKey;

  if (deleteKeyCombination) {
    selected.forEach((deviceId) => dispatch(deleteDevice(deviceId)));
    dispatch(clearSelected());
  }
  if (deselection) {
    dispatch(clearSelected());
  }
  if (ctrlZ) {
    const prevState = history[history.length - 1];
    if (prevState) {
      const devices = prevState.devices;
      const settings = prevState.settings;
      console.log(prevState);
      dispatch(setDevices(devices));
      dispatch(setSettings(settings));
      dispatch(popState({ devices, settings }));
    }
  }
}

export function getGroupWidth(devices, devicesId) {
  return Object.values(devices).reduce((sum, device) => {
    if (devicesId.includes(device.id)) {
      return sum + getDeviceTotalWidth(device);
    }
    return sum;
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

export function getDeviceTotalWidth(device) {
  const width = device.modules.value.reduce(
    (total, module) => total + Number(module.width),
    0
  );

  return width;
}

export function getDevicesWidth(devices) {
  let allModules = [];

  for (let device in devices) {
    allModules = allModules.concat(devices[device].modules.value);
  }

  const totalWidth = allModules.reduce(
    (sum, module) => sum + Number(module.width),
    0
  );

  return Math.round(totalWidth * 10) / 10;
}

export function getMaxInputHeight(devices, type) {
  let maxHeight = 12;

  for (let deviceId in devices) {
    const height = devices[deviceId][type].height;
    if (height > maxHeight) {
      maxHeight = height;
    }
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

export function getUsersTheme(devices) {
  const groups = getGroups(devices);
  const usersTheme = {};
  for (const group in groups) {
    usersTheme[group] = {
      groupBackground: devices[group].groupBackground,
      groupColor: devices[group].groupColor,
    };
  }

  return usersTheme;
}

export function getUsersColors(usersTheme) {
  const usersColors = new Set();

  for (const group in usersTheme) {
    usersColors.add(usersTheme[group].groupBackground);
    usersColors.add(usersTheme[group].groupColor);
  }

  return [...usersColors];
}

export function randomInteger(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
