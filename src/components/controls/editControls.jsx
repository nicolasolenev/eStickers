import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ControlLayout from './controlLayout';
import Button from './button';
import {
  toggleVisability,
  setSettings,
  setFontSize,
} from '../../store/settingsSlice';

import {
  combineDevices,
  splitDevices,
  deleteSelectedDevices,
  clearSelected,
  combineGroups,
  splitGroups,
  setDevices,
  // correctHeights,
} from '../../store/mainSlice';

import { pushState, popState } from '../../store/historySlice';

export default function EditControls() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const devices = useSelector((state) => state.main);
  const history = useSelector((state) => state.history);
  const isDisabledUnary = devices.selected.length === 0;
  const isDisabledMultiple = devices.selected.length < 2;
  const historyState = { devices, settings };

  const onClickHandler = (actions, isGroupsVisability) => {
    actions.forEach((action) => dispatch(action));
    if (isGroupsVisability && !settings.display.groups) {
      dispatch(toggleVisability('groups'));
    }
  };

  const onCancelClickHandler = () => {
    const prevState = history[history.length - 1];
    if (prevState) {
      const devices = prevState.devices;
      const settings = prevState.settings;
      dispatch(setDevices({ devices }));
      dispatch(setSettings({ settings }));
      dispatch(popState());
    }
  };

  return (
    <ControlLayout name="Редактировать">
      <div className="buttons-top">
        <Button
          value="Отменить"
          tip="Ctrl + Z"
          isDisabled={history.length === 0}
          onClickHandler={onCancelClickHandler}
        />

        <Button
          value="Объединить"
          tip="Shift + A"
          isDisabled={isDisabledMultiple}
          onClickHandler={() =>
            onClickHandler([combineDevices(), pushState(historyState)])
          }
        />

        <Button
          value="Разделить"
          tip="Ctrl + Shift + A"
          isDisabled={isDisabledUnary}
          onClickHandler={() =>
            onClickHandler([splitDevices(), pushState(historyState)])
          }
        />

        <Button
          value="Сгруппировать"
          tip="Shift + S"
          isDisabled={isDisabledMultiple}
          onClickHandler={() =>
            onClickHandler([combineGroups(), pushState(historyState)], true)
          }
        />

        <Button
          value="Разгруппировать"
          tip="Ctrl + Shift + S"
          isDisabled={isDisabledUnary}
          onClickHandler={() =>
            onClickHandler([splitGroups(), pushState(historyState)], true)
          }
        />

        <Button
          value="Удалить"
          tip="Shift + Delete"
          isDisabled={isDisabledUnary}
          onClickHandler={() =>
            onClickHandler([deleteSelectedDevices(), pushState(historyState)])
          }
        />

        <Button
          value="Отменить выделение"
          tip="Escape"
          isDisabled={isDisabledUnary}
          onClickHandler={() => onClickHandler([clearSelected()])}
        />
      </div>

      <div className="buttons-font-size-wrapper">
        <button
          className="font-down"
          disabled={settings.fontSize <= 7}
          onClick={() => {
            dispatch(setFontSize({ fontSize: settings.fontSize - 1 }));
            // dispatch(correctHeights({ delta: -4 }));
          }}
        />

        <span className="font-number">{settings.fontSize}pt</span>

        <button
          className="font-up"
          disabled={settings.fontSize >= 12}
          onClick={() => {
            dispatch(setFontSize({ fontSize: settings.fontSize + 1 }));
            // dispatch(correctHeights({ delta: 4 }));
          }}
        />
      </div>
    </ControlLayout>
  );
}
