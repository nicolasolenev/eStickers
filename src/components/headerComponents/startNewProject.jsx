import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setGroups } from '../../store/devicesSlice';
import { setSettings } from '../../store/settingsSlice';
import { setModal } from '../../store/modalSlice';
import { defaultSettingsState } from '../../vars';
import { saveProjectToFile } from '../../fs';

export default function StartNewProject() {
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices);
  const settings = useSelector((state) => state.settings);

  return (
    <>
      <button
        onClick={() => {
          // const isNeedSave = window.confirm('Сохранить текущий проект?');
          // if (isNeedSave) {
          //   saveProjectToFile({ groups: devices.groups, settings });
          // }

          // dispatch(setGroups({}));
          // dispatch(setSettings({ settings: defaultSettingsState }));
          dispatch(setModal({ type: 'isNeedSave' }));
          setTimeout(() => dispatch(setModal({ isVisible: true })), 0);
        }}
        className="button"
      >
        Начать новый проект
      </button>
    </>
  );
}
