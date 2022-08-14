import React, { useRef, useState, useEffect } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { useSelector, useDispatch } from 'react-redux';

import { getMaxInputHeight } from '../../functions';
import { setHeight } from '../../store/devicesSlice';

export default function DeviceMultilineInput({ deviceId, type, placeholder }) {
  const dispatch = useDispatch();

  const device = useSelector((state) => state['groupsNew']['groups'][deviceId]);

  const [text, setText] = useState(device.text ?? device[type].text);
  const devices = useSelector((state) => state.devices);
  const textareaRef = useRef();

  useEffect(() => {
    // const currentHeight = textareaRef.current.clientHeight;
    // if (type !== 'groups' && currentHeight !== device[type].height) {
    //   dispatch(
    //     setHeight({ currentHeight, deviceId: device.id, groupId, type, dinId })
    //   );
    // } else if (
    //   type === 'groups' &&
    //   currentHeight !==
    //     devices.groups[dinId].find((group) => group.id === groupId).height
    // ) {
    //   dispatch(
    //     setHeight({ currentHeight, deviceId: device.id, groupId, type, dinId })
    //   );
    // }
  });

  return (
    <div
      className={`device__${type}`}
      style={
        type === 'groups'
          ? {
              background: `${device.backgroundColor}`,
              color: `${device.textColor}`,
              // height: `${
              //   getMaxInputHeight(devices.groups[dinId], type) + 10
              // }px`,
            }
          : {
              // height: `${
              //   getMaxInputHeight(devices.groups[dinId], type) + 10
              // }px`,
            }
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
          // const currentHeight = textareaRef.current.clientHeight;
          // if (type !== 'groups' && currentHeight !== device[type].height) {
          //   dispatch(
          //     setHeight({
          //       currentHeight,
          //       deviceId: device.id,
          //       groupId,
          //       type,
          //       dinId,
          //     })
          //   );
          // } else if (
          //   type === 'groups' &&
          //   currentHeight !==
          //     devices.groups[dinId].find((group) => group.id === groupId).height
          // ) {
          //   dispatch(
          //     setHeight({
          //       currentHeight,
          //       deviceId: device.id,
          //       groupId,
          //       type,
          //       dinId,
          //     })
          //   );
          // }
          // setText(e.target.value);
        }}
        onBlur={(e) => {
          // if (type !== 'groups' && device[type].text !== text) {
          //   handler(e, type);
          // } else if (
          //   type === 'groups' &&
          //   devices.groups[dinId].find((group) => group.id === groupId).text !==
          //     text
          // ) {
          //   handler(e, type);
          // }
        }}
      />
    </div>
  );
}
