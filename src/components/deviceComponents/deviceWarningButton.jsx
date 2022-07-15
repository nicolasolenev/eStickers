import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleWarning, updateDeviceText } from '../../store/devicesSlice';

export default function DeviceWarningButton({
  device,
  groupId,
  setText,
  setHeight,
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
              })
            );

            dispatch(
              updateDeviceText({
                deviceId: device.id,
                groupId,
                text: '',
                key: 'warning',
              })
            );
          }
          dispatch(toggleWarning({ deviceId: device.id, groupId }));
        }}
      >
        {device.warning.isActive ? '×' : '+'}
      </button>
    </div>
  );
}
