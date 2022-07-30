import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleWarning, updateDeviceText } from '../../store/devicesSlice';

export default function DeviceWarningButton({
  device,
  groupId,
  setText,
  setHeight,
  dinId,
}) {
  const dispatch = useDispatch();

  return (
    <div className="device__warning-btn-wrapper">
      <button
        className="device__warning-btn"
        onClick={() => {
          if (device.warning.isActive) {
            setText('');
            dispatch(
              setHeight({
                currentHeight: 12,
                deviceId: device.id,
                groupId,
                type: 'warning',
                dinId,
              })
            );

            dispatch(
              updateDeviceText({
                deviceId: device.id,
                groupId,
                text: '',
                key: 'warning',
                dinId,
              })
            );
          }
          dispatch(toggleWarning({ deviceId: device.id, groupId, dinId }));
        }}
      >
        {device.warning.isActive ? '×' : '+'}
      </button>
    </div>
  );
}
