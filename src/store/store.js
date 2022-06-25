import { configureStore } from '@reduxjs/toolkit';

import devicesReducer from './devicesSlice';
import settingsReducer from './settingsSlice';
import historyReducer from './historySlice';

export const store = configureStore({
  reducer: {
    devices: devicesReducer,
    settings: settingsReducer,
    history: historyReducer,
  },
});
