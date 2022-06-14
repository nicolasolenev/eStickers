import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import ButtonVisability from './buttonsComponents/buttonVisability';
import ButtonCaption from './buttonsComponents/buttonCaption';
import { saveProjectToFile, readProject } from '../fs';
import { setSettings } from '../store/settingsSlice';
import { setDevices } from '../store/devicesSlice';

export default function ButtonsLeft() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const devices = useSelector((state) => state.devices);

  return (
    <div className="buttons">
      <ButtonCaption />

      <div className="buttons__title">Показать</div>
      <ButtonVisability fieldName="groups" text="Группы" />
      <ButtonVisability fieldName="points" text="Норм. положение" />
      <ButtonVisability fieldName="switches" text="Обознач. на схеме" />
      <ButtonVisability fieldName="descriptions" text="Название" />
      <ButtonVisability fieldName="modulesName" text="Полюса" />

      <div className="buttons__title">Печать</div>
      <ButtonVisability fieldName="numeration" text="Печать модулей" />

      {/* <Link to="/print">
        <button className="button">Сохранить pdf</button>
      </Link> */}

      {/* <ButtonMerge /> */}

      {/* <button
        className="button"
        onClick={() => {
          if (!settings.selected.length) {
            return;
          }
          dispatch(combineGroups(settings.selected));
          dispatch(clearSelected());
        }}
      >
        Сгруппировать
      </button> */}

      <button
        className="button"
        onClick={() => {
          saveProjectToFile({ devices, settings });
        }}
      >
        Сохранить в файл
      </button>

      <label className="button upload-button" htmlFor="upload-file">
        Загрузить из файла
        <input
          className="upload-file-input"
          type="file"
          id="upload-file"
          onChange={(e) => readProject(e, dispatch, setDevices, setSettings)}
        ></input>
      </label>
    </div>
  );
}
