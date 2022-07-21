import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ControlLayout from './controlLayout';
import { setModal } from '../../store/modalSlice';
import { readProject } from '../../fs';
import { setGroups } from '../../store/devicesSlice';
import { setSettings } from '../../store/settingsSlice';
import localization from '../../localization';

export default function FileControls() {
  const dispatch = useDispatch();
  const uploadRef = useRef();
  const settings = useSelector((state) => state.settings);
  const lang = settings.localization;

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
    <ControlLayout name={localization.controls.file.title[lang]}>
      <div className="buttons-file">
        <button className="button" onClick={onClickSave}>
          {localization.controls.file.buttonSave[lang]}
        </button>

        <button className="button" onClick={onClickUpload}>
          {localization.controls.file.buttonLoad[lang]}
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
