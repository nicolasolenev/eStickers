import { configureStore } from '@reduxjs/toolkit';
import devicesReducer from './devicesSlice';
import settingsReducer from './settingsSlice';

export const store = configureStore({
  reducer: {
    devices: devicesReducer,
    settings: settingsReducer,
  },
});
