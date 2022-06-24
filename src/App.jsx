import './App.scss';
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Palette from './components/palette/palette';
import Devices from './components/devices';
import ButtonsLeft from './components/buttonsLeft';
import Header from './components/header';
import ButtonsTop from './components/buttonsTop';
import { deleteDevice, setDevices } from './store/devicesSlice';
import { clearSelected, setSettings } from './store/settingsSlice';
import { popState, pushState } from './store/historySlice';
import { windowListenerHandler } from './functions';
import storage from './storage';

export default function App() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const devices = useSelector((state) => state.devices);
  const history = useSelector((state) => state.history);
  const selected = settings.selected;

  const onKeydownHandler = (e) =>
    windowListenerHandler(e, {
      dispatch,
      selected,
      deleteDevice,
      clearSelected,
      history,
      setDevices,
      setSettings,
      popState,
      pushState,
      devices,
      settings,
    });

  const onUnloadHandler = () => {
    storage.save({ devices, settings });
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
      <div id="dpi"></div>
      <Header />
      <ButtonsTop />
      <DevicesRow />
      <Palette />
    </>
  );
}

function DevicesRow() {
  const devicesRef = useRef();

  return (
    <div className="wrapper">
      <ButtonsLeft devicesRef={devicesRef} />
      <Devices devicesRef={devicesRef} />
    </div>
  );
}
