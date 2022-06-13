import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ButtonMerge from './buttonsComponents/buttonMerge';
import { clearSelected, toggleVisability } from '../store/settingsSlice';
import { combineGroups, deleteDevice } from '../store/devicesSlice';

export default function ButtonsTop() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  return (
    <div className="buttons-top">
      <ButtonMerge />

      <button
        className="button"
        onClick={() => {
          if (!settings.selected.length) {
            return;
          }
          dispatch(combineGroups(settings.selected));
          dispatch(clearSelected());
          if (!settings.display.groups) {
            dispatch(toggleVisability('groups'));
          }
        }}
      >
        Сгруппировать
      </button>

      <button className="button" onClick={() => dispatch(clearSelected())}>
        Отменить выделение
      </button>

      <button
        className="button"
        onClick={() => {
          settings.selected.forEach((deviceId) =>
            dispatch(deleteDevice({ deviceId }))
          );
          dispatch(clearSelected());
        }}
      >
        Удалить выделение
      </button>
    </div>
  );
}
