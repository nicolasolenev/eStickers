import React, { useRef, useState } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { useSelector, useDispatch } from 'react-redux';

import DeviceWarningButton from './deviceWarningButton';
import { getDeviceTotalWidth, getMaxInputHeight } from '../../functions';
import { setHeight } from '../../store/devicesSlice';

export default function DeviceWarning({ device, handler }) {
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices);
  const [text, setText] = useState(device.warning.text);
  const textareaRef = useRef();

  return (
    <div
      className={
        device.warning.isActive
          ? 'device__warning'
          : 'device__warning device__warning-hide'
      }
      style={{
        background: `${
          device.warning.isActive ? device.groupBackground : '#fff'
        }`,
        color: `${device.warning.textColor}`,
        width: `${getDeviceTotalWidth(device)}mm`,
        height: `${getMaxInputHeight(devices, 'warning') + 7}px`,
      }}
    >
      <DeviceWarningButton device={device} setText={setText} />

      <TextareaAutosize
        placeholder="Примеч."
        ref={textareaRef}
        value={text}
        onChange={(e) => {
          const currentHeight = textareaRef.current.clientHeight;

          if (currentHeight !== device['warning'].height) {
            dispatch(
              setHeight({ currentHeight, deviceId: device.id, type: 'warning' })
            );
          }

          setText(e.target.value);
        }}
        onBlur={(e) => handler(e, 'warning')}
      />
    </div>
  );
}
