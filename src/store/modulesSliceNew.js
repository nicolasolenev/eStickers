import { createSlice } from '@reduxjs/toolkit';

import defaultState, { defaultModule } from './defaultStates';

const initialState = {
  modules: defaultState.modules,
};

export const modulesSlice = createSlice({
  name: 'modules',
  initialState,
  reducers: {
    addModule: (state, action) => {
      const { id, dinId } = action.payload;

      const allModules = Object.values(state.modules);

      const filteredModules = allModules.filter(
        (module) => module.dinId === dinId
      );

      const index = filteredModules.length + 1;

      state.modules[id] = { ...defaultModule, index, dinId };
    },

    deleteModule: (state, action) => {
      const { ids } = action.payload;
      ids.forEach((id) => delete state.modules[id]);
    },

    setModuleText: (state, action) => {
      const { moduleId, text } = action.payload;

      state.modules[moduleId].text = text;
    },
  },
});

export const { addModule, deleteModule, setModuleText } = modulesSlice.actions;

export default modulesSlice.reducer;
