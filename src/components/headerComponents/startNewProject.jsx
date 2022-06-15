import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setDevices } from '../../store/devicesSlice';
import { setSettings } from '../../store/settingsSlice';
import { defaultDevicesState, defaultSettingsState } from '../../vars';
import { saveProjectToFile } from '../../fs';

export default function StartNewProject() {
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices);
  const settings = useSelector((state) => state.settings);

  return (
    <button
      onClick={() => {
        const isNeedSave = window.confirm('Сохранить текущий проект?');
        if (isNeedSave) {
          saveProjectToFile({ devices, settings });
        }

        dispatch(setDevices(defaultDevicesState));
        dispatch(setSettings(defaultSettingsState));
      }}
      className="button"
    >
      Начать новый проект
    </button>
  );
}
