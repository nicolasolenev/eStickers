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
    dispatch(setModal({ isVisible: false }));
    setTimeout(() => dispatch(setModal({ type: '' })), 300);
  };

  const onSubmit = () => {
    dispatch(setModal({ isVisible: false }));
    setTimeout(
      () => dispatch(setModal({ type: 'saving', prevModal: 'isNeedSave' })),
      100
    );
    setTimeout(() => dispatch(setModal({ isVisible: true })), 200);
  };

  return (
    <Modal
      title="Сохранить текущий проект?"
      onCancel={onCancel}
      onSubmit={onSubmit}
    />
  );
}
