import React, { useRef, useState } from 'react';
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
  // const groups = useSelector((state) => state.devices);
  // const devices = [].concat(...groups.groups.map((group) => group.devices));
  const textareaRef = useRef();

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
