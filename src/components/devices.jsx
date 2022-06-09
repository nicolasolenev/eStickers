import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteDevice } from '../store/devicesSlice';

import Device from './device';
import { getClasses, getAllDevicesTotalWidth } from '../functions';
import { addDevice } from '../store/devicesSlice';
import { clearSelected } from '../store/settingsSlice';

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
    }
  }

  React.useEffect(() => {
    window.addEventListener('keydown', windowListener);
    return () => window.removeEventListener('keydown', windowListener);
  });

  return (
    <>
      <div
        className={getClasses('devices', {
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
          style={{ width: `${getAllDevicesTotalWidth(devices)}mm` }}
        >
          {getAllDevicesTotalWidth(devices)} mm
        </div>
        {Object.values(devices).map((device) => {
          const id = count;
          count = count + device.modules.value.length;
          return <Device key={device.id} id={id} device={device} />;
        })}

        <div className="devices__add">
          <button
            className="devices__add-btn"
            onClick={() => {
              if (getAllDevicesTotalWidth(devices) + 18 > 287) {
                alert('Больше не поместится, сори, бро');
              } else {
                dispatch(addDevice(settings.palette.theme));
              }
            }}
          >
            +
          </button>
        </div>
      </div>
    </>
  );
}
