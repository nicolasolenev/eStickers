import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Ruler from './deviceComponents/ruler';
import DeviceHoverBtns from './deviceComponents/deviceHoverBtns';
import DevicePoint from './deviceComponents/devicePoint';
import DeviceDescription from './deviceComponents/deviceDescription';
import DeviceField from './deviceComponents/deviceField';
import DeviceWarning from './deviceComponents/deviceWarning';
import Modules from './deviceComponents/modules';
import { updateSelected } from '../store/settingsSlice';
import { updateDeviceText } from '../store/devicesSlice';
import { getDeviceTotalWidth } from '../functions';

export default function Device({ device, id }) {
  const deviceId = device.id;
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  function singleDeviceClickHandler(e) {
    if (e.altKey) {
      dispatch(updateSelected({ deviceId }));
    }
  }

  function deviceInputHandler(e, key) {
    let text = e.target.value;
    if (key === 'switch') {
      text = text.toUpperCase();
    }
    dispatch(
      updateDeviceText({
        deviceId,
        text,
        key,
      })
    );
  }

  return (
    <div
      className={
        settings.selected.includes(deviceId) ? 'device selected' : 'device'
      }
      style={{
        width: `${getDeviceTotalWidth(device)}mm`,
      }}
      onClick={singleDeviceClickHandler}
    >
      <DeviceHoverBtns device={device} />

      {device.warning.isActive && (
        <DeviceWarning device={device} handler={deviceInputHandler} />
      )}

      <DeviceField
        name="group"
        placeholder="Где?"
        device={device}
        handler={deviceInputHandler}
      />

      <DevicePoint device={device} dispatch={dispatch} deviceId={deviceId} />

      <DeviceField
        name="switch"
        placeholder="QF1"
        device={device}
        handler={deviceInputHandler}
      />

      <DeviceDescription device={device} handler={deviceInputHandler} />

      <Modules device={device} deviceId={deviceId} id={id} />

      <div className="rulers">
        {device.modules.value.map((module) => (
          <Ruler key={module.id} deviceId={deviceId} moduleId={module.id} />
        ))}
      </div>
    </div>
  );
}
