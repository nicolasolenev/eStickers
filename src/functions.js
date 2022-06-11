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

export function createGroup() {
  const initialDevice = createSingleDevice();

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
    groupId: 1234,
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

export function getAllDevicesTotalWidth(devices) {
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
