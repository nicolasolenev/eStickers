import THEME from './theme';
import { randomInteger } from './functions';
import { nanoid } from 'nanoid';

export const defaultSettingsState = {
  projectName: 'Стикеры',
  paperWidth: 297,
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
    type: 'backgroundColor',
    borderColor: 'white',
    checked: {
      warning: false,
      group: true,
      normallyOn: true,
      switch: true,
      description: true,
      modules: true,
    },
  },
};

export function createSingleDevice(theme) {
  const id = nanoid();

  return {
    id: id,
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
      width: 18,
      module: [{ id: id, text: '', width: 18 }],
    },
    warning: {
      text: '',
      isActive: false,
      height: '29px',
    },
  };
}

export function createGroup(theme = 'gray') {
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
    id: nanoid(),
    text: '',
    height: '29px',
    backgroundColor,
    textColor,
    devices: [createSingleDevice(theme)],
  };
}

export const themes = [
  { value: '', label: 'Пользовательская' },
  { value: 'gray', label: 'Серая' },
  { value: 'random-gradient', label: 'Случайная градиентная' },
  // { value: 'colored', label: 'Цветная' },
  // { value: 'coloredWhiteText', label: 'Цветная, белый текст' },
];
