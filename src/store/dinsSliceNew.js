import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = {
  dins: {
    // 1: [1],
    // 2: [2],
  },
};

export const dinsSlice = createSlice({
  name: 'modules',
  initialState,
  reducers: {
    addDin: (state) => {
      state.dins[nanoid()] = [];
    },

    deleteDin: (state, action) => {
      const { dinId } = action.payload;

      delete state.dins[dinId];
    },

    addGroupAtDin: (state, action) => {
      const { dinId, groupId } = action.payload;

      state.dins[dinId].push(groupId);
    },
  },
});

export const { addDin, deleteDin, addGroupAtDin } = dinsSlice.actions;

export default dinsSlice.reducer;
