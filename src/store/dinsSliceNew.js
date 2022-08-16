import { createSlice } from '@reduxjs/toolkit';

import defaultState, { defaultDin } from '../defaultStates';

const initialState = {
  dins: defaultState.dins,
};

export const dinsSlice = createSlice({
  name: 'dins',
  initialState,
  reducers: {
    addDin: (state, action) => {
      const { id } = action.payload;

      state.dins[id] = { ...defaultDin, groups: [] };
    },

    deleteDin: (state, action) => {
      const { dinId } = action.payload;

      delete state.dins[dinId];
    },

    addGroupAtDin: (state, action) => {
      const { id, dinId } = action.payload;

      state.dins[dinId].groups.push(id);
    },

    setHeight: (state, action) => {
      const { type, height, dinId } = action.payload;
      state.dins[dinId][type] = height;
    },

    deleteGroupIds: (state, action) => {
      const { groupIds, dinId } = action.payload;
      state.dins[dinId].groups = state.dins[dinId].groups.filter(
        (id) => !groupIds.includes(id)
      );
    },
  },
});

export const { addDin, deleteDin, addGroupAtDin, setHeight, deleteGroupIds } =
  dinsSlice.actions;

export default dinsSlice.reducer;
