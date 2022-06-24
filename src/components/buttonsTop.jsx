import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ButtonMerge from './buttonsComponents/buttonMerge';
import {
  clearSelected,
  toggleVisability,
  setSettings,
} from '../store/settingsSlice';
import { setDevices, splitDevice, splitGroup } from '../store/devicesSlice';
import { pushState, popState } from '../store/historySlice';
import {
  combineGroups,
  deleteDevice,
  toggleDeviceNormallyOn,
} from '../store/devicesSlice';
import { getDevicesWidth } from '../functions';

export default function ButtonsTop() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const devices = useSelector((state) => state.devices);
  const history = useSelector((state) => state.history);
  const devicesWidth = getDevicesWidth(devices);
  const isDisabled = settings.selected.length === 0;

  return (
    <div className="buttons-top">
      <div className="buttons-top__buttons">
        <button
          className="button"
          onClick={() => {
            const prevState = history[history.length - 1];
            if (prevState) {
              const devices = prevState.devices;
              const settings = prevState.settings;
              console.log(prevState);
              dispatch(setDevices(devices));
              dispatch(setSettings(settings));
              dispatch(popState({ devices, settings }));
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
            if (!settings.selected.length) {
              return;
            }

            if (devices[settings.selected[0]].modules.value.length > 1) {
              dispatch(
                splitDevice({
                  deviceId: settings.selected[0],
                  theme: settings.palette.theme,
                })
              );
              dispatch(clearSelected());
              dispatch(pushState({ devices, settings }));
            }
          }}
        >
          Разделить
        </button>

        <button
          className="button"
          disabled={isDisabled}
          onClick={() => {
            if (!settings.selected.length) {
              return;
            }
            dispatch(combineGroups(settings.selected));
            dispatch(clearSelected());
            dispatch(pushState({ devices, settings }));
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
            if (!settings.selected.length) {
              return;
            }
            dispatch(splitGroup(devices[settings.selected[0]].groupId));
            dispatch(clearSelected());
            dispatch(pushState({ devices, settings }));
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
            settings.selected.forEach((deviceId) =>
              dispatch(deleteDevice(deviceId))
            );
            dispatch(clearSelected());
            dispatch(pushState({ devices, settings }));
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
          onClick={() => {
            settings.selected.forEach((deviceId) =>
              dispatch(toggleDeviceNormallyOn({ deviceId, key: 'isVisible' }))
            );
            dispatch(clearSelected());
          }}
        >
          Скрыть/показать норм.положение
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
