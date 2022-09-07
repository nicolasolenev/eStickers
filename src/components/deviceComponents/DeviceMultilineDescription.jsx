import React, { useRef, useState, useEffect, useMemo } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { useSelector, useDispatch } from 'react-redux';

import { getMaxInputHeight } from '../../functions';
import {
  setHeight,
  setDeviceInputHeight,
  updateDeviceText,
} from '../../store/mainSlice';

export default function DeviceMultilineDescription({ deviceId, dinId }) {
  const dispatch = useDispatch();

  const din = useSelector((state) => state.main.dins[dinId]);
  const settings = useSelector((state) => state.settings);
  const devices = useSelector((state) => state.main.devices);
  const main = useSelector((state) => state.main);
  const device = devices[deviceId];

  const [text, setText] = useState(device.description.text);
  const textareaRef = useRef();

  const fontSize = settings.fontSize;

  useEffect(() => {
    console.log('change fontSize');
    dispatch(
      setDeviceInputHeight({
        type: 'description',
        currentHeight: textareaRef.current.clientHeight,
        deviceId,
      })
    );

    dispatch(
      setHeight({
        type: 'descriptionHeight',
        height: getMaxInputHeight(
          dinId,
          'description',
          textareaRef.current.clientHeight,
          main,
          deviceId
        ),
        dinId,
      })
    );
  }, [fontSize]);

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
                  dinId,
                  'description',
                  currentHeight,
                  main,
                  deviceId
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
