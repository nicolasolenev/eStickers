import { nanoid } from 'nanoid';

const defaultId = nanoid();
const defaultMultilineHeight = 13;
const defaultTextColor = 'black';
const defaultBackgroundColor = '#E7E6E6';

export const defaultModule = { text: '' };

export const defaultDevice = {
  normallyOn: {
    value: true,
    isVisible: true,
  },
  switch: {
    text: '',
  },
  description: {
    text: '',
    height: defaultMultilineHeight,
  },
  warning: {
    backgroundColor: defaultBackgroundColor,
    textColor: defaultTextColor,
    text: '',
    isActive: false,
    height: defaultMultilineHeight,
  },
  width: 18,
};

export const defaultGroup = {
  text: '',
  height: defaultMultilineHeight,
  backgroundColor: defaultBackgroundColor,
  textColor: defaultTextColor,
};

export const defaultDin = {
  warningHeight: defaultMultilineHeight,
  groupHeight: defaultMultilineHeight,
  descriptionHeight: defaultMultilineHeight,
};

const defaultState = {
  dins: {
    [defaultId]: { ...defaultDin, groups: [defaultId] },
  },

  groups: {
    [defaultId]: { ...defaultGroup, devices: [defaultId], dinId: defaultId },
  },

  devices: {
    [defaultId]: { ...defaultDevice, modules: [defaultId], dinId: defaultId },
  },

  modules: {
    [defaultId]: { ...defaultModule, index: 1, dinId: defaultId },
  },
};

export default defaultState;
