import React, { useRef, useEffect } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { useSelector, useDispatch } from 'react-redux';

import DeviceWarningButton from './deviceWarningButton';
import { getDeviceTotalWidth, getMaxInputHeight } from '../../functions';
import { setHeight } from '../../store/devicesSlice';

export default function DeviceWarning({ device, handler }) {
  const devices = useSelector((state) => state.devices);
  const textareaRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const currentHeight = textareaRef.current.clientHeight;

    dispatch(
      setHeight({ currentHeight, deviceId: device.id, type: 'warning' })
    );
  });

  return (
    <div
      className={
        device.warning.isActive
          ? 'device__warning'
          : 'device__warning device__warning-hide'
      }
      style={{
        background: `${
          device.warning.isActive ? device.warning.backgroundColor : '#fff'
        }`,
        color: `${device.warning.textColor}`,
        width: `${getDeviceTotalWidth(device)}mm`,
        height: `${getMaxInputHeight(devices, 'warning') + 7}px`,
      }}
    >
      <DeviceWarningButton device={device} />

      <TextareaAutosize
        placeholder="Примеч."
        ref={textareaRef}
        value={device['warning'].text}
        onChange={(e) => {
          const currentHeight = textareaRef.current.clientHeight;

          if (currentHeight !== device['warning'].height) {
            dispatch(
              setHeight({ currentHeight, deviceId: device.id, type: 'warning' })
            );
          }

          handler(e, 'warning');
        }}
      />
    </div>
  );
}
