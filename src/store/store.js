import { configureStore } from '@reduxjs/toolkit';

import devicesReducer from './devicesSlice';
import settingsReducer from './settingsSlice';
import historyReducer from './historySlice';
import modalReducer from './modalSlice';

export const store = configureStore({
  reducer: {
    devices: devicesReducer,
    settings: settingsReducer,
    history: historyReducer,
    modal: modalReducer,
  },
});
