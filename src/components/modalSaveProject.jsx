import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { saveProjectToFile } from '../fs';
import { setModal } from '../store/modalSlice';
import { setGroups } from '../store/devicesSlice';
import { setSettings } from '../store/settingsSlice';
import { defaultSettingsState } from '../vars';

import Modal from './modal';

export default function ModalSaveProject() {
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices);
  const settings = useSelector((state) => state.settings);
  const modal = useSelector((state) => state.modal);
  const [name, setName] = useState(settings.projectName);

  const project = {
    groups: devices.groups,
    settings,
  };

  const onCancel = () => {
    dispatch(setModal({ type: '', prevModal: 'saving' }));
  };

  const onSubmit = () => {
    saveProjectToFile(project, name);
    if (modal.prevModal === 'isNeedSave') {
      dispatch(setGroups({}));
      dispatch(setSettings({ settings: defaultSettingsState }));
    }
    setTimeout(
      () => dispatch(setModal({ type: '', prevModal: 'saving' })),
      1000
    );
  };

  return (
    <Modal
      title="Сохранить проект как:"
      onCancel={onCancel}
      onSubmit={onSubmit}
    >
      <input
        className="modal__input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Название проекта..."
      />
    </Modal>
  );
}
