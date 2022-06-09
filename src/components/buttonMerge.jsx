import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearSelected } from '../store/settingsSlice';
import { combineDevices } from '../store/devicesSlice';

export function ButtonMerge() {
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  return (
    <button
      className="button"
      onClick={() => {
        if (!settings.selected.length) {
          return;
        }
        dispatch(combineDevices({ selected: settings.selected }));
        dispatch(clearSelected());
      }}
    >
      Объединить выделенные
    </button>
  );
}
