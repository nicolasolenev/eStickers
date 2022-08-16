import React, { useRef, useState } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { useSelector, useDispatch } from 'react-redux';

import DeviceWarningBtn from './deviceWarningBtn';
import { getDeviceTotalWidth, getMaxInputHeight } from '../../functions';
import {
  setDeviceInputHeight,
  updateDeviceText,
} from '../../store/devicesSliceNew';
import { setHeight } from '../../store/dinsSliceNew';

export default function DeviceWarning({ deviceId, dinId }) {
  const dispatch = useDispatch();
  const din = useSelector((state) => state.dinsNew.dins[dinId]);
  const devices = useSelector((state) => state.devicesNew.devices);
  const device = devices[deviceId];
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
          device.warning.isActive
            ? device.warning.backgroundColor
            : 'transparent'
        }`,
        color: `${device.warning.textColor}`,
        height: `${din.warningHeight + 8}px`,
      }}
    >
      <DeviceWarningBtn deviceId={deviceId} setText={setText} dinId={dinId} />

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
              setDeviceInputHeight({ type: 'warning', currentHeight, deviceId })
            );
            dispatch(
              setHeight({
                type: 'warningHeight',
                height: getMaxInputHeight(
                  devices,
                  dinId,
                  'warning',
                  deviceId,
                  currentHeight
                ),
                dinId,
              })
            );
          }
          setText(e.target.value);
        }}
        onBlur={(e) => {
          if (device.warning.text !== text) {
            dispatch(
              updateDeviceText({
                deviceId,
                text: e.target.value,
                type: 'warning',
              })
            );
          }
        }}
      />
    </div>
  );
}
