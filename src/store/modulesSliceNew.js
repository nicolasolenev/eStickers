import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modules: {
    // 1: { text: 'f', width: 18, index: 1, dinId: 1 },
    // 2: { text: 's', width: 18, index: 2, dinId: 1 },
    // 3: { text: 't', width: 18, index: 3, dinId: 1 },
    // 4: { text: 'fo', width: 18, index: 1, dinId: 2 },
  },
};

export const modulesSlice = createSlice({
  name: 'modules',
  initialState,
  reducers: {
    addModule: (state, action) => {
      const { moduleId, dinId } = action.payload;

      const modules = Object.values(state.modules);

      console.log(modules);

      const filteredModules = modules.filter((module) => {
        return module.dinId === dinId;
      });

      const index = filteredModules.length + 1 || 1;

      const newModule = {
        text: '',
        width: 18,
        index,
        dinId,
      };

      state.modules[moduleId] = newModule;
    },

    deleteModule: (state, action) => {
      const { moduleId } = action.payload;

      delete state.modules[moduleId];
    },
  },
});

export const { addModule, deleteModule } = modulesSlice.actions;

export default modulesSlice.reducer;
