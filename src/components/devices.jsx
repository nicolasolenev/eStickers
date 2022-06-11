import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Device from './device';
import { getClasses, getAllDevicesTotalWidth } from '../functions';
import { addDevice, deleteDevice } from '../store/devicesSlice';
import { clearSelected } from '../store/settingsSlice';

export default function Devices() {
  const settings = useSelector((state) => state.settings);
  const devices = useSelector((state) => state.devices);
  const rowWidth = getAllDevicesTotalWidth(devices);
  const dispatch = useDispatch();
  const devicesRef = useRef();
  let count = 1;

  function windowListener(e) {
    if ((e.key === 'Delete' || e.key === 'Backspace') && e.shiftKey) {
      settings.selected.forEach((deviceId) =>
        dispatch(deleteDevice({ deviceId }))
      );
      dispatch(clearSelected());
    }
    if (e.key === 'Escape') {
      dispatch(clearSelected());
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', windowListener);
    return () => window.removeEventListener('keydown', windowListener);
  });

  return (
    <>
      <div style={{ width: '1100px', overflow: 'scroll' }}>
        <div
          className={getClasses('devices numeration', {
            description: settings.sequence,
            // numeration: settings.numeration,
            modulesName: settings.modulesName,
            groups: settings.groups,
            switches: settings.switches,
            descriptions: settings.descriptions,
            points: settings.points,
          })}
          style={{ width: `${settings.paperWidth}mm` }}
          ref={devicesRef}
        >
          <div className="devices__ruler" style={{ width: `${rowWidth}mm` }}>
            {rowWidth} мм
          </div>

          <div className="devices__ruler-height">{`мм`}</div>

          {Object.values(devices).map((device) => {
            const id = count;
            count = count + device.modules.value.length;
            return <Device key={device.id} id={id} device={device} />;
          })}

          <div className="devices__add">
            <button
              className="devices__add-btn"
              onClick={() => {
                dispatch(addDevice(settings.palette.theme));
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
