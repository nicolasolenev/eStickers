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

export default THEME;
