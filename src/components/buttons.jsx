import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  changeSequence,
  setNumeration,
  clearSelected,
  modulesNameVisability,
  groupsVisability,
} from '../store/settingsSlice';
import { combineDevices } from '../store/devicesSlice';

export default function Buttons() {
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  return (
    <div className="buttons">
      <button className="button" onClick={() => dispatch(changeSequence())}>
        {settings.sequence ? 'Надписи' : 'Подписи'}
      </button>

      <button className="button" onClick={() => dispatch(setNumeration())}>
        {settings.numeration ? 'Скрыть нумерацию' : 'Показать нумерацию'}
      </button>

      <button
        className="button"
        onClick={() => dispatch(modulesNameVisability())}
      >
        {settings.modulesName ? 'Скрыть модули' : 'Показать модули'}
      </button>

      <button className="button" onClick={() => dispatch(groupsVisability())}>
        {settings.groups ? 'Скрыть группы' : 'Показать группы'}
      </button>

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
        Объединить ячейки
      </button>
      <Link to="/print">
        <button className="button">Сохранить pdf</button>
      </Link>
    </div>
  );
}
