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
    group: {
      text: '',
    },
    normallyOn: true,
    switch: {
      text: '',
      textColor: '#000',
      backgroundColor: 'transparent',
    },
    description: {
      text: '',
    },
    modules: [{ moduleName: '', width: 18, id: id }],
    warning: {
      text: '',
      color: '#eb8044',
      backgroundColor: 'transparent',
    },
    selected: false,
    background: '#f2f2f2',
  };
}

export function getDeviceTotalWidth(device) {
  const width = device.modules.reduce(
    (total, module) => total + (module.width < 8 ? 8 : Number(module.width)),
    0
  );
  return width < 8 ? 8 : width;
}
