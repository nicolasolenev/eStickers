import THEME from './theme';

export function classes(defaultClass, obj) {
  let resultClass = defaultClass;
  for (const key in obj) {
    if (obj[key]) {
      resultClass += ' ' + key;
    }
  }

  return resultClass;
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
    selected: false,
    group: {
      text: '',
      backgroundColor: backgroundColor,
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
    (total, module) => total + (module.width < 8 ? 8 : Number(module.width)),
    0
  );
  return width < 8 ? 8 : width;
}
