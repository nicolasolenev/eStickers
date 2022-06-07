import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteDevice } from '../store/devicesSlice';

import Device from './device';
import { classes } from '../functions';
import { addDevice, clearAllSelected } from '../store/devicesSlice';
import { clearSelected } from '../store/settingsSlice';

export default function Devices() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const devices = useSelector((state) => state.devices);
  let count = 1;
  const devicesRef = useRef();

  function windowListener(e) {
    if (e.key === 'Backspace') {
      settings.selected.forEach((deviceId) =>
        dispatch(deleteDevice({ deviceId }))
      );
      dispatch(clearSelected());
    }
    if (e.key === 'Escape') {
      dispatch(clearSelected());
      dispatch(clearAllSelected());
    }
  }

  React.useEffect(() => {
    window.addEventListener('keydown', windowListener);
    return () => window.removeEventListener('keydown', windowListener);
  });

  return (
    <>
      <div
        ref={devicesRef}
        className={classes('devices', {
          description: settings.sequence,
          numeration: settings.numeration,
          modulesName: settings.modulesName,
          groups: settings.groups,
        })}
      >
        {Object.values(devices).map((device) => {
          const id = count;
          count = count + device.modules.length;
          return <Device key={device.id} id={id} device={device} />;
        })}

        <div className="devices__add">
          <button
            className="devices__add-btn"
            onClick={() => dispatch(addDevice())}
          >
            +
          </button>
        </div>
      </div>
    </>
  );
}
