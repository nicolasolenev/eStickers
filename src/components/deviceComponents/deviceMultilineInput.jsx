import React, { useRef, useEffect } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { useSelector, useDispatch } from 'react-redux';

import { getMaxDescriptionHeight, getMaxInputHeight } from '../../functions';
import { setHeight } from '../../store/devicesSlice';

export default function DeviceMultilineInput({
  device,
  handler,
  type,
  placeholder,
}) {
  const devices = useSelector((state) => state.devices);
  const textareaRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const currentHeight = textareaRef.current.clientHeight;

    dispatch(setHeight({ currentHeight, deviceId: device.id, type }));
  }, []);

  return (
    <div
      className={`device__${type}`}
      style={{
        background: `${device[type].backgroundColor}`,
        height: `${getMaxInputHeight(devices, type) + 17}px`,
      }}
    >
      <TextareaAutosize
        placeholder={placeholder}
        ref={textareaRef}
        value={device[type].text}
        onChange={(e) => {
          const currentHeight = textareaRef.current.clientHeight;

          if (currentHeight !== device[type].height) {
            dispatch(setHeight({ currentHeight, deviceId: device.id, type }));
          }

          handler(e, type);
        }}
      />
    </div>
  );
}
