import React, { useRef, useState } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { useSelector, useDispatch } from 'react-redux';

import { getMaxInputHeight } from '../../functions';
import { setHeight } from '../../store/devicesSlice';

export default function DeviceMultilineInput({
  device,
  handler,
  type,
  placeholder,
}) {
  const dispatch = useDispatch();
  const [text, setText] = useState(device[type].text);
  const devices = useSelector((state) => state.devices);
  const textareaRef = useRef();

  return (
    <div
      className={`device__${type}`}
      style={
        type === 'group'
          ? {
              background: `${device.groupBackground}`,
              color: `${device.groupColor}`,
              height: `${getMaxInputHeight(devices, type) + 17}px`,
            }
          : { height: `${getMaxInputHeight(devices, type) + 17}px` }
      }
    >
      <TextareaAutosize
        placeholder={placeholder}
        ref={textareaRef}
        value={text}
        onChange={(e) => {
          const currentHeight = textareaRef.current.clientHeight;

          if (currentHeight !== device[type].height) {
            dispatch(setHeight({ currentHeight, deviceId: device.id, type }));
          }

          setText(e.target.value);
        }}
        onBlur={(e) => handler(e, type)}
      />
    </div>
  );
}
