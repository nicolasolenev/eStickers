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
  setGroups,
  splitDevices,
  clearSelected,
  combineDevices,
} from '../../store/devicesSlice';
import { pushState, popState } from '../../store/historySlice';
import { combineGroups, splitGroups } from '../../store/devicesSlice';
import { deleteSelectedDevices } from '../../store/devicesSlice';
import localization from '../../localization';

export default function EditControls() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const lang = settings.localization;
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
    <ControlLayout name={localization.controls.edit.title[lang]}>
      <div className="buttons-top">
        <Button
          value={localization.controls.edit.button.cancel[lang]}
          tip="Ctrl + Z"
          isDisabled={history.length === 0}
          onClickHandler={onCancelClickHandler}
        />

        <Button
          value={localization.controls.edit.button.combine[lang]}
          tip="Shift + A"
          isDisabled={isDisabled}
          onClickHandler={() =>
            onClickHandler([
              combineDevices(),
              pushState({ groups: devices.groups, settings }),
            ])
          }
        />

        <Button
          value={localization.controls.edit.button.split[lang]}
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
          value={localization.controls.edit.button.group[lang]}
          tip="Shift + S"
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
          value={localization.controls.edit.button.ungroup[lang]}
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
          value={localization.controls.edit.button.delete[lang]}
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
          value={localization.controls.edit.button.unselect[lang]}
          tip="Escape"
          isDisabled={isDisabled}
          onClickHandler={() => onClickHandler([clearSelected()])}
        />
      </div>

      <div className="buttons-font-size-wrapper">
        <button
          className="font-down"
          onClick={() => {
            if (settings.fontSize > 7)
              dispatch(setFontSize({ fontSize: settings.fontSize - 1 }));
          }}
        />

        <span className="font-number">{settings.fontSize}pt</span>

        <button
          className="font-up"
          onClick={() => {
            dispatch(setFontSize({ fontSize: settings.fontSize + 1 }));
          }}
        />
      </div>
    </ControlLayout>
  );
}
