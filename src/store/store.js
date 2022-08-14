import { configureStore } from '@reduxjs/toolkit';

import devicesReducer from './devicesSlice';
import settingsReducer from './settingsSlice';
import historyReducer from './historySlice';
import modalReducer from './modalSlice';
import modulesNewReducer from './modulesSliceNew';
import devicesNewReducer from './devicesSliceNew';
import groupsNewReducer from './groupsSliceNew';
import dinsNewReducer from './dinsSliceNew';

export const store = configureStore({
  reducer: {
    devices: devicesReducer,
    settings: settingsReducer,
    history: historyReducer,
    modal: modalReducer,

    modulesNew: modulesNewReducer,
    devicesNew: devicesNewReducer,
    groupsNew: groupsNewReducer,
    dinsNew: dinsNewReducer,
  },
});
