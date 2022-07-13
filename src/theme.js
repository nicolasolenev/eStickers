const THEME = {
  gray: [
    {
      groupBackground: '#E7E6E6',
      groupColor: '#000',
    },
  ],

  colored: [
    {
      groupBackground: '#BE0711',
      groupColor: '#fff',
    },

    {
      groupBackground: '#FFF2CE',
      groupColor: '#FEC83D',
    },

    {
      groupBackground: '#E3EFDA',
      groupColor: '#76B364',
    },

    {
      groupBackground: '#DFEAF6',
      groupColor: '#64A6D9',
    },
  ],

  coloredWhiteText: [
    {
      groupBackground: '#BE0711',
      groupColor: '#fff',
    },

    {
      groupBackground: '#49811e',
      groupColor: '#fff',
    },

    {
      groupBackground: '#93660b',
      groupColor: '#fff',
    },

    {
      groupBackground: '#2a75c6',
      groupColor: '#fff',
    },
  ],

  getDefaultColors: () => {
    const colors = new Set();
    for (const name in THEME) {
      if (typeof THEME[name] !== 'function') {
        THEME[name].forEach((theme) => {
          colors.add(theme.groupBackground);
          colors.add(theme.groupColor);
        });
      }
    }
    return [...colors];
  },
};

export const defaultColors = [
  '#E7E6E6',
  '#FFF2CE',
  '#E3EFDA',
  '#DFEAF6',
  '#FFD6AF',
  '#49811e',
  '#93660b',
  '#AF929D',
  '#2a75c6',
  '#BE0711',
  '#8367C7',
  '#FEC83D',
  '#76B364',
  '#64A6D9',
  '#fff',
  '#000',
];

export const defaultWarningColors = [
  ['#E7E6E6', '#000000'],
  ['#E7E6E6', '#0070C1'],
  ['#E7E6E6', '#ED7D31'],
  ['#E7E6E6', '#BE0711'],
  ['#0070C1', '#ffffff'],
  ['#ED7D31', '#ffffff'],
  ['#BE0711', '#ffffff'],
];

export default THEME;
