import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from './buttonsComponents/button';
import Lengths from './Lengths';
import { toggleVisability, setSettings } from '../store/settingsSlice';
import {
  setGroups,
  splitDevices,
  clearSelected,
  addGroupAfterSelected,
  combineDevices,
} from '../store/devicesSlice';
import { pushState, popState } from '../store/historySlice';
import { combineGroups, splitGroups } from '../store/devicesSlice';
import { deleteSelectedDevices } from '../store/devicesSlice';

export default function ButtonsTop() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const devices = useSelector((state) => state.devices);
  const history = useSelector((state) => state.history);
  const isDisabled = devices.selected.length === 0;

  const onClickHandler = (actions, isGroupsVisability) => {
    actions.forEach((action) => dispatch(action));
    if (isGroupsVisability && !settings.display.groups) {
      dispatch(toggleVisability('groups'));
    }
  };

  const onCancelClickHandler = () => {
    const prevState = history[history.length - 1];
    if (prevState) {
      const groups = prevState.groups;
      const settings = prevState.settings;
      dispatch(setGroups({ groups }));
      dispatch(setSettings(settings));
      dispatch(popState({ groups, settings }));
    }
  };

  return (
    <div className="buttons-top-wrapper">
      <div className="buttons-top">
        <Button
          value="Отменить"
          tip="Ctrl + Z"
          isDisabled={history.length === 0}
          onClickHandler={onCancelClickHandler}
        />

        <Button
          value="Объединить"
          tip="Ctrl + A"
          isDisabled={isDisabled}
          onClickHandler={() =>
            onClickHandler([
              combineDevices(),
              pushState({ groups: devices.groups, settings }),
            ])
          }
        />

        <Button
          value="Разделить"
          tip="Ctrl + Shift + A"
          isDisabled={isDisabled}
          onClickHandler={() =>
            onClickHandler([
              splitDevices(),
              pushState({ groups: devices.groups, settings }),
            ])
          }
        />

        <Button
          value="Сгруппировать"
          tip="Ctrl + S"
          isDisabled={isDisabled}
          onClickHandler={() =>
            onClickHandler(
              [
                combineGroups(),
                pushState({ groups: devices.groups, settings }),
              ],
              true
            )
          }
        />

        <Button
          value="Разгруппировать"
          tip="Ctrl + Shift + S"
          isDisabled={isDisabled}
          onClickHandler={() =>
            onClickHandler(
              [splitGroups(), pushState({ groups: devices.groups, settings })],
              true
            )
          }
        />

        <Button
          value="Удалить выделенные"
          tip="Shift + Delete"
          isDisabled={isDisabled}
          onClickHandler={() =>
            onClickHandler([
              deleteSelectedDevices(),
              pushState({ groups: devices.groups, settings }),
            ])
          }
        />

        <Button
          value="Отменить выделение"
          tip="Escape"
          isDisabled={isDisabled}
          onClickHandler={() => onClickHandler([clearSelected()])}
        />

        <Button
          value="Добавить группу после выделенной группы"
          tip="Ctrl + N"
          isDisabled={isDisabled}
          onClickHandler={() =>
            onClickHandler([
              addGroupAfterSelected({ theme: settings.palette.theme }),
              pushState({ groups: devices.groups, settings }),
            ])
          }
        />
      </div>

      <Lengths />
    </div>
  );
}
