import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  groups: {
    // 1: [1, 2],
    // 2: [3],
    // 1: {
    //   text: '',
    //   height: '29px',
    //   backgroundColor: 'gray',
    //   textColor: 'black',
    //   devices: [],
    // },
  },
};

export const groupsSlice = createSlice({
  name: 'modules',
  initialState,
  reducers: {
    addGroup: (state, action) => {
      const { groupId, deviceId } = action.payload;

      state.groups[groupId] = {
        text: '',
        height: '29px',
        backgroundColor: 'gray',
        textColor: 'black',
        devices: [deviceId],
      };
    },

    deleteGroup: (state, action) => {
      const { groupId } = action.payload;

      delete state.groups[groupId];
    },
  },
});

export const { addGroup, deleteGroup } = groupsSlice.actions;

export default groupsSlice.reducer;
