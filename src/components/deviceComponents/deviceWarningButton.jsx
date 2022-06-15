import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleWarning, updateDeviceText } from '../../store/devicesSlice';

export default function DeviceWarningButton({ device, setText, setHeight }) {
  const dispatch = useDispatch();

  return (
    <div className="device__warning-btn-wrapper">
      <button
        className="device__hover-btns-btn device__warning-btn"
        onClick={() => {
          if (device.warning.isActive) {
            setText('');

            dispatch(
              setHeight({
                currentHeight: 12,
                deviceId: device.id,
                type: 'warning',
              })
            );

            dispatch(
              updateDeviceText({
                deviceId: device.id,
                text: '',
                key: 'warning',
              })
            );
          }
          dispatch(toggleWarning(device.id));
        }}
      >
        {device.warning.isActive ? 'x warn' : 'add warn'}
      </button>
    </div>
  );
}
