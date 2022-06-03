import React from 'react';
import Device from './device';
import { classes } from '../functions';
import { useSelector, useDispatch } from 'react-redux';
import { addDevice } from '../store/devicesSlice';

export default function Devices(props) {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const devices = useSelector((state) => state.devices);

  let count = 1;

  return (
    <div
      className={classes('devices', {
        description: settings.sequence,
        numeration: settings.numeration,
      })}
    >
      {Object.values(devices).map((device) => {
        const id = count;
        count = count + device.modules.length;
        return (
          <Device
            key={device.id}
            deviceId={device.id}
            id={id}
            device={device}
          />
        );
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
  );
}
