import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { clearSelected } from '../../store/settingsSlice';
import { combineDevices } from '../../store/devicesSlice';
import { pushState } from '../../store/historySlice';

export default function ButtonMerge({ isDisabled }) {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const devices = useSelector((state) => state.devices);

  return (
    <button
      className="button"
      disabled={isDisabled}
      onClick={() => {
        if (!settings.selected.length) {
          return;
        }
        dispatch(combineDevices({ selected: settings.selected }));
        dispatch(clearSelected());
        dispatch(pushState({ devices, settings }));
      }}
    >
      Объединить
    </button>
  );
}
