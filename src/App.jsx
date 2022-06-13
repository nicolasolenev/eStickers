import './App.scss';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Devices from './components/devices';
import Buttons from './components/buttons';
import Palette from './components/palette/palette';
import Header from './components/header';
import ButtonsTop from './components/buttonsTop';
import storage from './storage';
import { windowListenerHandler } from './functions';
import { deleteDevice } from './store/devicesSlice';
import { clearSelected } from './store/settingsSlice';

export default function App() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const devices = useSelector((state) => state.devices);
  const selected = settings.selected;

  const onKeydownHandler = (e) =>
    windowListenerHandler(e, {
      dispatch,
      selected,
      deleteDevice,
      clearSelected,
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
      <Header />
      <ButtonsTop />
      <DevicesRow />
      <Palette />
    </>
  );
}

function DevicesRow(props) {
  return (
    <div className="wrapper">
      <Buttons />
      <Devices />
    </div>
  );
}
