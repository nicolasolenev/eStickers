export function classes(defaultClass, obj) {
  let resultClass = defaultClass;
  for (const key in obj) {
    if (obj[key]) {
      resultClass += ' ' + key;
    }
  }

  return resultClass;
}

export function createSingleDevice() {
  const id = Number(new Date());

  return {
    id: id,
    group: '',
    normallyOn: true,
    switch: '',
    description: '',
    modules: [{ moduleName: '', width: 18, id: id }],
    warning: '',
    selected: false,
  };
}

export function getDeviceTotalWidth(device) {
  const width = device.modules.reduce(
    (total, module) => total + (module.width < 8 ? 8 : Number(module.width)),
    0
  );
  return width < 8 ? 8 : width;
}
