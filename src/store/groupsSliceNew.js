import { createSlice } from '@reduxjs/toolkit';

import defaultState, { defaultGroup } from './defaultStates';

const initialState = {
  groups: defaultState.groups,
};

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    addGroup: (state, action) => {
      const { id, dinId } = action.payload;

      state.groups[id] = { ...defaultGroup, devices: [id], dinId };
    },

    deleteGroup: (state, action) => {
      const { groupId } = action.payload;

      delete state.groups[groupId];
    },

    setGroupInputHeight: (state, action) => {
      const { currentHeight, groupId } = action.payload;

      state.groups[groupId].height = currentHeight;
    },

    updateGroupText: (state, action) => {
      const { groupId, text } = action.payload;

      state.groups[groupId].text = text;
    },
  },
});

export const { addGroup, deleteGroup, setGroupInputHeight, updateGroupText } =
  groupsSlice.actions;

export default groupsSlice.reducer;
