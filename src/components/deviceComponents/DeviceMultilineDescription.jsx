import React, { useRef, useState } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { useSelector, useDispatch } from 'react-redux';

import { getMaxInputHeight } from '../../functions';
import {
  setDeviceInputHeight,
  updateDeviceText,
} from '../../store/devicesSliceNew';
import { setHeight } from '../../store/dinsSliceNew';

export default function DeviceMultilineDescription({ deviceId, dinId }) {
  const dispatch = useDispatch();

  const din = useSelector((state) => state.dinsNew.dins[dinId]);
  const devices = useSelector((state) => state.devicesNew.devices);
  const device = devices[deviceId];

  const [text, setText] = useState(device.description.text);
  const textareaRef = useRef();

  return (
    <div
      className="device__description"
      style={{
        height: `${din.descriptionHeight + 8}px`,
      }}
    >
      <TextareaAutosize
        placeholder="Название"
        ref={textareaRef}
        value={text}
        onFocus={(e) => {
          setTimeout(function () {
            e.target.selectionStart = e.target.selectionEnd = 10000;
          }, 0);
        }}
        onChange={(e) => {
          const currentHeight = textareaRef.current.clientHeight;

          if (currentHeight !== device['description'].height) {
            dispatch(
              setDeviceInputHeight({
                type: 'description',
                currentHeight,
                deviceId,
              })
            );
            dispatch(
              setHeight({
                type: 'descriptionHeight',
                height: getMaxInputHeight(
                  devices,
                  dinId,
                  'description',
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
          if (device.description.text !== text) {
            dispatch(
              updateDeviceText({
                deviceId,
                text: e.target.value,
                type: 'description',
              })
            );
          }
        }}
      />
    </div>
  );
}
