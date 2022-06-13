import THEME from './theme';

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
  { dispatch, selected, deleteDevice, clearSelected }
) {
  const deleteKeyCombination =
    (e.key === 'Delete' || e.key === 'Backspace') && e.shiftKey;
  const deselection = e.key === 'Escape';

  if (deleteKeyCombination) {
    selected.forEach((deviceId) => dispatch(deleteDevice({ deviceId })));
    dispatch(clearSelected());
  }
  if (deselection) {
    dispatch(clearSelected());
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

export function createSingleDevice(theme) {
  const id = Number(new Date());
  let backgroundColor = '#f2f2f2';
  let textColor = '#000';

  if (theme) {
    backgroundColor = THEME[theme].deviceBackground;
    textColor = THEME[theme].deviceText;
  }

  return {
    id: id,
    groupId: id,
    group: {
      text: '',
      backgroundColor: backgroundColor,
      height: '29px',
    },
    normallyOn: {
      value: true,
      backgroundColor: backgroundColor,
    },
    switch: {
      text: '',
      textColor: textColor,
      backgroundColor: backgroundColor,
    },
    description: {
      text: '',
      textColor: textColor,
      backgroundColor: backgroundColor,
      height: '29px',
    },
    modules: {
      value: [{ moduleName: '', width: 18, id: id }],
      backgroundColor: backgroundColor,
      textColor: textColor,
    },
    warning: {
      text: '',
      color: '#eb8044',
      backgroundColor: backgroundColor,
      isActive: false,
      height: '29px',
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
