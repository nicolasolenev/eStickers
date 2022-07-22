import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import ControlLayout from './controlLayout';
import { setModal } from '../../store/modalSlice';
import { readProject } from '../../fs';
import { setGroups } from '../../store/devicesSlice';
import { setSettings } from '../../store/settingsSlice';

export default function FileControls() {
  const dispatch = useDispatch();
  const uploadRef = useRef();

  const onClickSave = () => {
    dispatch(setModal({ type: 'saving' }));
    setTimeout(() => dispatch(setModal({ isVisible: true })), 0);
  };

  const onClickUpload = () => uploadRef.current.click();

  const onChangeUpload = (e) => {
    readProject(e, dispatch, setGroups, setSettings);
    e.target.value = null;
  };

  return (
    <ControlLayout name="Файл">
      <div className="buttons-file">
        <button className="button" onClick={onClickSave}>
          Сохранить в файл
        </button>

        <button className="button" onClick={onClickUpload}>
          Загрузить из файла
        </button>

        <input
          className="upload-file-input"
          type="file"
          ref={uploadRef}
          onChange={onChangeUpload}
          accept=".json"
        />
      </div>
    </ControlLayout>
  );
}
