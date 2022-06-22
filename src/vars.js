import THEME from './theme';
import { randomInteger } from './functions';

export const defaultSettingsState = {
  projectName: 'Стикеры',
  paperWidth: 297,
  selected: [],
  usersTheme: {},
  display: {
    sequence: false,
    numeration: true,
    modulesName: true,
    groups: true,
    switches: true,
    descriptions: true,
    points: true,
  },
  palette: {
    theme: 'gray',
    type: 'groupBackground',
    borderColor: 'white',
    checked: {
      warning: false,
      group: true,
      normallyOn: true,
      switch: true,
      description: true,
      modules: true,
    },
    colors: [],
  },
};

export function createSingleDevice(theme) {
  const id = Number(new Date());
  let backgroundColor = '#f2f2f2';
  let textColor = '#000';

  if (theme) {
    if (THEME[theme].length === 1) {
      backgroundColor = THEME[theme][0].groupBackground;
      textColor = THEME[theme][0].groupColor;
    } else {
      const themeLastIndex = THEME[theme].length - 1;
      const randomIndex = randomInteger(0, themeLastIndex);
      backgroundColor = THEME[theme][randomIndex].groupBackground;
      textColor = THEME[theme][randomIndex].groupColor;
    }
  }

  return {
    id: id,
    groupId: id,
    groupBackground: backgroundColor,
    groupColor: textColor,
    count: 1,
    group: {
      text: '',
      height: '29px',
    },
    normallyOn: {
      value: true,
      isVisible: true,
    },
    switch: {
      text: '',
    },
    description: {
      text: '',
      height: '29px',
    },
    modules: {
      totalWidth: 18,
      value: [{ moduleName: '', width: 18, id: id }],
    },
    warning: {
      text: '',
      isActive: false,
      height: '29px',
    },
  };
}

const initialDevice = createSingleDevice('gray');

export const defaultDevicesState = {
  [initialDevice.id]: initialDevice,
};

export const themes = [
  { value: '', label: 'Пользовательская' },
  { value: 'gray', label: 'Серая' },
  { value: 'colored', label: 'Цветная' },
  { value: 'coloredWhiteText', label: 'Цветная, белый текст' },
];
