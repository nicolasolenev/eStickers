import React, { useRef, useState } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { useSelector, useDispatch } from 'react-redux';

import DeviceWarningButton from './deviceWarningButton';
import { getDeviceTotalWidth, getMaxInputHeight } from '../../functions';
import { setHeight } from '../../store/devicesSlice';

export default function DeviceWarning({ group, device, handler }) {
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
          device.warning.isActive ? group.backgroundColor : '#fff'
        }`,
        color: `${group.textColor}`,
        width: `${getDeviceTotalWidth(device)}mm`,
        height: `${getMaxInputHeight(devices.groups, 'warning') + 7}px`,
      }}
    >
      <DeviceWarningButton
        device={device}
        groupId={group.id}
        setText={setText}
        setHeight={setHeight}
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
