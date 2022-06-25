import React from 'react';
import { toggleDeviceNormallyOn } from '../../store/devicesSlice';

export default function DevicePoint({ device, groupId, dispatch }) {
  return (
    <div
      className="device__point"
      onClick={() =>
        dispatch(
          toggleDeviceNormallyOn({ deviceId: device.id, groupId, key: 'value' })
        )
      }
    >
      <span
        className={
          !device.normallyOn.value
            ? 'point-circle'
            : 'point-circle point-circle_active'
        }
        style={{
          display: `${device.normallyOn.isVisible ? 'inline-block' : 'none'}`,
        }}
      ></span>
    </div>
  );
}
