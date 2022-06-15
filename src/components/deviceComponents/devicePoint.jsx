import React from 'react';
import { toggleDeviceNormallyOn } from '../../store/devicesSlice';

export default function DevicePoint({ device, dispatch, deviceId }) {
  return (
    <div
      className="device__point"
      onClick={() => dispatch(toggleDeviceNormallyOn({ deviceId }))}
    >
      <span
        className={
          !device.normallyOn.value
            ? 'point-circle'
            : 'point-circle point-circle_active'
        }
      ></span>
    </div>
  );
}
