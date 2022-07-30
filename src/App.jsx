import './App.scss';
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Devices from './components/devices';
import Palette from './components/palette/palette';
import PaperFormat from './components/paperFormat';
import Lengths from './components/Lengths';
import Controls from './components/controls';
import Hint from './components/hint';
import ModalSaveProject from './components/modal/modalSaveProject';
import IsNeedSaveModal from './components/modal/isNeedSaveModal';
import {
  deleteSelectedDevices,
  setGroups,
  clearSelected,
  combineDevices,
  splitDevices,
  combineGroups,
  splitGroups,
  addDeviceBefore,
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
      addDeviceBefore,
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
      <Controls devicesRef={devicesRef} />
      <Palette />

      <div className="paper-options">
        <PaperFormat />
        {/* <Lengths /> */}
      </div>

      <div className="wrapper">
        <Devices devicesRef={devicesRef} />
      </div>

      <Hint />

      {modal.type === 'saving' && <ModalSaveProject />}
      {modal.type === 'isNeedSave' && <IsNeedSaveModal />}
    </>
  );
}
