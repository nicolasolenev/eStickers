import { createSlice } from '@reduxjs/toolkit';

const getNewDevice = () => {
  return {
    normallyOn: {
      value: true,
      isVisible: true,
    },
    switch: {
      text: '',
    },
    description: {
      text: '',
      height: '29px',
    },
    modules: {
      width: 18,
      module: [],
    },
    warning: {
      backgroundColor: '#E7E6E6',
      textColor: '000',
      text: '',
      isActive: false,
      height: '29px',
    },
  };
};

const initialState = {
  devices: {
    // 1: {
    //   normallyOn: {
    //     value: true,
    //     isVisible: true,
    //   },
    //   switch: {
    //     text: '',
    //   },
    //   description: {
    //     text: '',
    //     height: '29px',
    //   },
    //   modules: {
    //     width: 36,
    //     module: [1, 2],
    //   },
    //   warning: {
    //     backgroundColor: '#E7E6E6',
    //     textColor: '000',
    //     text: '',
    //     isActive: false,
    //     height: '29px',
    //   },
    // },
    // 2: {
    //   normallyOn: {
    //     value: true,
    //     isVisible: true,
    //   },
    //   switch: {
    //     text: '',
    //   },
    //   description: {
    //     text: '',
    //     height: '29px',
    //   },
    //   modules: {
    //     width: 18,
    //     module: [3],
    //   },
    //   warning: {
    //     backgroundColor: '#E7E6E6',
    //     textColor: '000',
    //     text: '',
    //     isActive: false,
    //     height: '29px',
    //   },
    // },
    // 3: {
    //   normallyOn: {
    //     value: true,
    //     isVisible: true,
    //   },
    //   switch: {
    //     text: '',
    //   },
    //   description: {
    //     text: '',
    //     height: '29px',
    //   },
    //   modules: {
    //     width: 18,
    //     module: [4],
    //   },
    //   warning: {
    //     backgroundColor: '#E7E6E6',
    //     textColor: '000',
    //     text: '',
    //     isActive: false,
    //     height: '29px',
    //   },
    // },
  },
};

export const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    addDevice: (state, action) => {
      const { deviceId, moduleId } = action.payload;

      const newDevice = getNewDevice();
      newDevice.modules.module.push(moduleId);

      state.devices[deviceId] = newDevice;
    },

    deleteDevice: (state, action) => {
      const { deviceId } = action.payload;

      delete state.devices[deviceId];
    },
  },
});

export const { addDevice, deleteDevice } = devicesSlice.actions;

export default devicesSlice.reducer;
