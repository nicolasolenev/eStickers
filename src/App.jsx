import './App.scss';
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Devices from './components/devices';
import ButtonsTop from './components/buttonsTop';
import ModalSaveProject from './components/modalSaveProject';
import IsNeedSaveModal from './components/isNeedSaveModal';
import {
  deleteSelectedDevices,
  setGroups,
  clearSelected,
  combineDevices,
  splitDevices,
  combineGroups,
  splitGroups,
  addGroupAfterSelected,
} from './store/devicesSlice';
import { setSettings, toggleVisability } from './store/settingsSlice';
import { popState, pushState } from './store/historySlice';
import { windowListenerHandler } from './functions';
import storage from './storage';

export default function App() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const devices = useSelector((state) => state.devices);
  const history = useSelector((state) => state.history);
  const modal = useSelector((state) => state.modal);
  const selected = settings.selected;
  const devicesRef = useRef();

  const onKeydownHandler = (e) =>
    windowListenerHandler(e, {
      dispatch,
      selected,
      deleteSelectedDevices,
      clearSelected,
      history,
      setGroups,
      setSettings,
      popState,
      pushState,
      groups: devices.groups,
      settings,
      devices,
      combineDevices,
      splitDevices,
      combineGroups,
      splitGroups,
      toggleVisability,
      addGroupAfterSelected,
    });

  const onUnloadHandler = () => {
    storage.save({ devices: devices.groups, settings });
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeydownHandler);
    return () => window.removeEventListener('keydown', onKeydownHandler);
  });

  useEffect(() => {
    window.addEventListener('unload', onUnloadHandler);
    return () => window.removeEventListener('unload', onUnloadHandler);
  });

  return (
    <>
      <ButtonsTop devicesRef={devicesRef} />

      <div className="wrapper">
        <Devices devicesRef={devicesRef} />
      </div>

      {modal.type === 'saving' && <ModalSaveProject />}
      {modal.type === 'isNeedSave' && <IsNeedSaveModal />}
    </>
  );
}
