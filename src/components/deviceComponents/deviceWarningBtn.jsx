import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setHeight,
  setDeviceInputHeight,
  updateDeviceText,
  toggleWarning,
} from '../../store/mainSlice';

import { getMaxInputHeight } from '../../functions';

export default function DeviceWarningBtn({ deviceId, setText, dinId }) {
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.main.devices);
  const main = useSelector((state) => state.main);
  // const devices = useSelector((state) => state.devicesNew.devices);
  const device = devices[deviceId];

  return (
    <div className="device__warning-btn-wrapper">
      <button
        className="device__warning-btn"
        onClick={() => {
          if (device.warning.isActive) {
            setText('');
            dispatch(
              setDeviceInputHeight({
                type: 'warning',
                currentHeight: 13,
                deviceId,
              })
            );

            dispatch(
              setHeight({
                type: 'warningHeight',
                height: getMaxInputHeight(dinId, 'warning', 13, main, deviceId),
                dinId,
              })
            );

            dispatch(
              updateDeviceText({
                deviceId,
                text: '',
                type: 'warning',
              })
            );
          }
          dispatch(toggleWarning({ deviceId }));
        }}
      >
        {device.warning.isActive ? '×' : '+'}
      </button>
    </div>
  );
}
