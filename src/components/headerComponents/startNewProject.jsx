import React from 'react';
import { useDispatch } from 'react-redux';

import { setDevices } from '../../store/devicesSlice';
import { setSettings } from '../../store/settingsSlice';
import { defaultDevicesState, defaultSettingsState } from '../../vars';

export default function StartNewProject() {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => {
        dispatch(setDevices(defaultDevicesState));
        dispatch(setSettings(defaultSettingsState));
      }}
      className="button"
    >
      Начать новый проект
    </button>
  );
}
