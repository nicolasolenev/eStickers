import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeSequence,
  setNumeration,
  clearSelected,
} from '../store/settingsSlice';
import { combineDevices } from '../store/devicesSlice';

export default function Buttons() {
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  return (
    <div className="buttons">
      <button
        className="sequence-btn"
        onClick={() => dispatch(changeSequence())}
      >
        {settings.sequence ? 'Надписи' : 'Подписи'}
      </button>

      <button onClick={() => dispatch(setNumeration())}>
        {settings.numeration ? 'Скрыть нумерацию' : 'Показать нумерацию'}
      </button>

      <button
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
    </div>
  );
}
