import React, { useRef, useState, useEffect } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { useSelector, useDispatch } from 'react-redux';

import DeviceWarningButton from './deviceWarningButton';
import { getDeviceTotalWidth, getMaxInputHeight } from '../../functions';
import { setHeight } from '../../store/devicesSlice';

export default function DeviceWarning({ group, device, handler, dinId }) {
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices);
  const [text, setText] = useState(device.warning.text);
  const textareaRef = useRef();

  useEffect(() => {
    const currentHeight = textareaRef.current.clientHeight;

    if (currentHeight !== device['warning'].height) {
      dispatch(
        setHeight({
          currentHeight,
          deviceId: device.id,
          groupId: group.id,
          type: 'warning',
          dinId,
        })
      );
    }
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
          device.warning.isActive
            ? device.warning.backgroundColor
            : 'transparent'
        }`,
        color: `${device.warning.textColor}`,
        width: `calc(${getDeviceTotalWidth(device)}mm + 1px)`,
        height: `${getMaxInputHeight(devices.groups[dinId], 'warning') + 7}px`,
      }}
    >
      <DeviceWarningButton
        device={device}
        groupId={group.id}
        setText={setText}
        setHeight={setHeight}
        dinId={dinId}
      />

      <TextareaAutosize
        placeholder="Примеч."
        ref={textareaRef}
        value={text}
        onFocus={(e) => {
          setTimeout(function () {
            e.target.selectionStart = e.target.selectionEnd = 10000;
          }, 0);
        }}
        onChange={(e) => {
          const currentHeight = textareaRef.current.clientHeight;

          if (currentHeight !== device['warning'].height) {
            dispatch(
              setHeight({
                currentHeight,
                deviceId: device.id,
                groupId: group.id,
                type: 'warning',
                dinId,
              })
            );
          }

          setText(e.target.value);
        }}
        onBlur={(e) => {
          if (device.warning.text !== text) {
            handler(e, 'warning');
          }
        }}
      />
    </div>
  );
}
