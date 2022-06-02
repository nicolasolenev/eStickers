export function classes(defaultClass, obj) {
  let resultClass = defaultClass;
  for (const key in obj) {
    if (obj[key]) {
      resultClass += ' ' + key;
    }
  }

  return resultClass;
}

export function getDevicesWithCombinedDevice(devices, selected) {
  devices = devices.map((device) => Object.assign({}, device));

  const devicesToCombine = selected.map((id) =>
    devices.find((device) => device.id === id)
  );

  let newDevice = devicesToCombine.shift();

  newDevice.modules = [...newDevice.modules].concat(
    ...devicesToCombine.map((device) => device.modules)
  );

  const lastSelected = [...selected];
  lastSelected.shift();

  const newDeviceIndex = devices.findIndex(
    (device) => device.id === newDevice.id
  );

  const newDevices = [...devices];
  newDevices.splice(newDeviceIndex, 1, newDevice);

  return newDevices.filter((device) => !lastSelected.includes(device.id));
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
