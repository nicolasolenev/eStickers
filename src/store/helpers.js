export const getModulesIdOnDin = (state, dinId) =>
  state.dins[dinId].groups
    .map((groupId) => state.groups[groupId].devices)
    .flat()
    .map((deviceId) => state.devices[deviceId].modules)
    .flat();

export const getAllDevicesId = (state) =>
  Object.values(state.dins)
    .map((din) => din.groups)
    .flat()
    .map((groupId) => state.groups[groupId].devices)
    .flat();

export const getSelectedDevicesId = (selected) =>
  selected.map((device) => device.deviceId);

export const findId = (state, id, type1, type2) => {
  const arr = Object.values(state[type1]);

  const arrIndex = arr.findIndex((group) => group[type2].includes(id));

  return Object.keys(state[type1])[arrIndex];
};

export const recountIndexes = (state) => {
  Object.keys(state.dins).forEach((dinId) => {
    let count = 1;

    const modulesOnDin = getModulesIdOnDin(state, dinId);

    modulesOnDin.forEach((moduleId) => {
      state.modules[moduleId].index = count;
      count = count + 1;
    });
  });
};
