import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteDevice } from '../store/devicesSlice';

import Device from './device';
import { classes } from '../functions';
import { addDevice, clearAllSelected } from '../store/devicesSlice';
import { clearSelected } from '../store/settingsSlice';

function getDevicesTotalWidth(devices) {
  let allModules = [];

  for (let device in devices) {
    allModules = allModules.concat(devices[device].modules.value);
  }

  const totalWidth = allModules.reduce(
    (sum, module) => sum + Number(module.width),
    0
  );

  return Math.round(totalWidth * 10) / 10;
}

export default function Devices() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const devices = useSelector((state) => state.devices);
  let count = 1;

  function windowListener(e) {
    if ((e.key === 'Delete' || e.key === 'Backspace') && e.altKey) {
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
        className={classes('devices', {
          description: settings.sequence,
          numeration: settings.numeration,
          modulesName: settings.modulesName,
          groups: settings.groups,
          switches: settings.switches,
          descriptions: settings.descriptions,
          points: settings.points,
        })}
      >
        <div
          className="devices__ruler"
          style={{ width: `${getDevicesTotalWidth(devices)}mm` }}
        >
          {getDevicesTotalWidth(devices)} mm
        </div>
        {Object.values(devices).map((device) => {
          const id = count;
          count = count + device.modules.value.length;
          return <Device key={device.id} id={id} device={device} />;
        })}

        <div className="devices__add">
          <button
            className="devices__add-btn"
            onClick={() => dispatch(addDevice(settings.palette.theme))}
          >
            +
          </button>
        </div>
      </div>
    </>
  );
}
