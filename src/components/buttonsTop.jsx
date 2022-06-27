import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ButtonMerge from './buttonsComponents/buttonMerge';
import { toggleVisability, setSettings } from '../store/settingsSlice';
import {
  setGroups,
  splitDevices,
  clearSelected,
  addGroupAfterSelected,
} from '../store/devicesSlice';
import { pushState, popState } from '../store/historySlice';
import {
  combineGroups,
  splitGroups,
  toggleDeviceNormallyOn,
} from '../store/devicesSlice';
import { getDevicesWidth } from '../functions';
import { deleteSelectedDevices } from '../store/devicesSlice';

export default function ButtonsTop() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const devices = useSelector((state) => state.devices);
  const history = useSelector((state) => state.history);
  const devicesWidth = getDevicesWidth(devices.groups);
  const isDisabled = devices.selected.length === 0;

  return (
    <div className="buttons-top">
      <div className="buttons-top__buttons">
        <button
          className="button"
          onClick={() => {
            const prevState = history[history.length - 1];
            if (prevState) {
              const groups = prevState.groups;
              const settings = prevState.settings;
              console.log(groups);
              dispatch(setGroups({ groups }));
              dispatch(setSettings(settings));
              dispatch(popState({ groups, settings }));
            }
          }}
        >
          Отменить
        </button>

        <ButtonMerge isDisabled={isDisabled} />

        <button
          className="button"
          disabled={isDisabled}
          onClick={() => {
            if (!devices.selected.length) {
              return;
            }

            dispatch(splitDevices());
            dispatch(pushState({ groups: devices.groups, settings }));
          }}
        >
          Разделить
        </button>

        <button
          className="button"
          disabled={isDisabled}
          onClick={() => {
            if (!devices.selected.length) {
              return;
            }
            dispatch(combineGroups());
            dispatch(pushState({ groups: devices.groups, settings }));
            if (!settings.display.groups) {
              dispatch(toggleVisability('groups'));
            }
          }}
        >
          Сгруппировать
        </button>

        <button
          className="button"
          disabled={isDisabled}
          onClick={() => {
            if (!devices.selected.length) {
              return;
            }
            dispatch(splitGroups());
            dispatch(pushState({ groups: devices.groups, settings }));
            if (!settings.display.groups) {
              dispatch(toggleVisability('groups'));
            }
          }}
        >
          Разгруппировать
        </button>

        <button
          className="button"
          disabled={isDisabled}
          onClick={() => {
            dispatch(deleteSelectedDevices());

            dispatch(pushState({ groups: devices.groups, settings }));
          }}
        >
          Удалить выделенные
        </button>

        <button
          className="button"
          disabled={isDisabled}
          onClick={() => dispatch(clearSelected())}
        >
          Отменить выделение
        </button>

        <button
          className="button"
          disabled={isDisabled}
          onClick={() =>
            dispatch(addGroupAfterSelected({ theme: settings.palette.theme }))
          }
        >
          Добавить аппарат после выделенной группы
        </button>

        {/* <button
          className="button"
          onClick={() => {
            dispatch(pushState({ devices, settings }));
          }}
        >
          Сохранить состояние
        </button> */}
      </div>

      <div className="lengths">
        <div className="total-height">
          Общая длина аппаратов:
          <span className="total-height__value">{devicesWidth}</span>
          мм
        </div>

        <div className="total-height">
          Высота стикеров:
          <span className="total-height__value">xyz</span>
          мм
        </div>
      </div>
    </div>
  );
}
