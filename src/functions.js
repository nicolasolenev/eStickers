export function classes(defaultClass, obj) {
  let resultClass = defaultClass;
  for (const key in obj) {
    if (obj[key]) {
      resultClass += ' ' + key;
    }
  }

  return resultClass;
}

export function getDevicesWithChangedModuleWidth(
  devices,
  deviceId,
  moduleId,
  width
) {
  const devicesCopy = [...devices];

  return devicesCopy.map((device) => {
    if (device.id === deviceId) {
      device.modules = [...device.modules].map((module) => {
        if (module.id === moduleId) {
          module.width = Number(width);
        }
        return module;
      });
    }
    return device;
  });
}

export function getDeviceTotalWidth(device) {
  return device.modules.reduce((total, module) => total + module.width, 0);
}
