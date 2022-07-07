import React, { useRef, useState, useEffect } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { useSelector, useDispatch } from 'react-redux';

import { getMaxInputHeight } from '../../functions';
import { setHeight } from '../../store/devicesSlice';

export default function DeviceMultilineInput({
  device,
  groupId,
  handler,
  type,
  placeholder,
}) {
  const dispatch = useDispatch();
  const [text, setText] = useState(device.text ?? device[type].text);
  const devices = useSelector((state) => state.devices);
  const textareaRef = useRef();

  useEffect(() => {
    const currentHeight = textareaRef.current.clientHeight;

    if (type !== 'group' && currentHeight !== device[type].height) {
      dispatch(
        setHeight({ currentHeight, deviceId: device.id, groupId, type })
      );
    } else if (
      type === 'group' &&
      currentHeight !==
        devices.groups.find((group) => group.id === groupId).height
    ) {
      dispatch(
        setHeight({ currentHeight, deviceId: device.id, groupId, type })
      );
    }
  });

  return (
    <div
      className={`device__${type}`}
      style={
        type === 'group'
          ? {
              background: `${device.backgroundColor}`,
              color: `${device.textColor}`,
              height: `${getMaxInputHeight(devices.groups, type) + 17}px`,
            }
          : { height: `${getMaxInputHeight(devices.groups, type) + 17}px` }
      }
    >
      <TextareaAutosize
        placeholder={placeholder}
        ref={textareaRef}
        value={text}
        onFocus={(e) => {
          setTimeout(function () {
            e.target.selectionStart = e.target.selectionEnd = 10000;
          }, 0);
        }}
        onChange={(e) => {
          const currentHeight = textareaRef.current.clientHeight;

          if (type !== 'group' && currentHeight !== device[type].height) {
            dispatch(
              setHeight({ currentHeight, deviceId: device.id, groupId, type })
            );
          } else if (
            type === 'group' &&
            currentHeight !==
              devices.groups.find((group) => group.id === groupId).height
          ) {
            dispatch(
              setHeight({ currentHeight, deviceId: device.id, groupId, type })
            );
          }

          setText(e.target.value);
        }}
        onBlur={(e) => {
          if (type !== 'group' && device[type].text !== text) {
            handler(e, type);
          } else if (
            type === 'group' &&
            devices.groups.find((group) => group.id === groupId).text !== text
          ) {
            handler(e, type);
          }
        }}
      />
    </div>
  );
}
