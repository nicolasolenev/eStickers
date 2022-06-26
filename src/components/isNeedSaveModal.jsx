import React from 'react';
import { useDispatch } from 'react-redux';

import Modal from './modal';
import { setModal } from '../store/modalSlice';
import { setGroups } from '../store/devicesSlice';
import { setSettings } from '../store/settingsSlice';
import { defaultSettingsState } from '../vars';

export default function IsNeedSaveModal() {
  const dispatch = useDispatch();
  const onCancel = () => {
    dispatch(setGroups({}));
    dispatch(setSettings({ settings: defaultSettingsState }));
    dispatch(setModal({ type: '' }));
  };

  const onSubmit = () => {
    dispatch(setModal({ type: 'saving', prevModal: 'isNeedSave' }));
  };

  return (
    <Modal
      title="Хотите сохранить текущий проект?"
      onCancel={onCancel}
      onSubmit={onSubmit}
    />
  );
}
