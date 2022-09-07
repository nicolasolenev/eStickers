import React, { useRef, useState, useEffect } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { useSelector, useDispatch } from 'react-redux';

import { getMaxGroupHeight } from '../../functions';
import {
  setHeight,
  setGroupInputHeight,
  updateGroupText,
} from '../../store/mainSlice';

export default function DeviceMultilineGroup({ groupId, dinId }) {
  const dispatch = useDispatch();

  const din = useSelector((state) => state.main.dins[dinId]);
  const settings = useSelector((state) => state.settings);
  const groups = useSelector((state) => state.main.groups);
  const main = useSelector((state) => state.main);
  const group = groups[groupId];

  const [text, setText] = useState(group.text);
  const textareaRef = useRef();

  const fontSize = settings.fontSize;

  useEffect(() => {
    console.log('change fontSize');
    dispatch(
      setGroupInputHeight({
        currentHeight: textareaRef.current.clientHeight,
        groupId,
      })
    );

    dispatch(
      setHeight({
        type: 'groupHeight',
        height: getMaxGroupHeight(
          dinId,
          textareaRef.current.clientHeight,
          main,
          groupId
        ),
        dinId,
      })
    );
  }, [fontSize]);

  return (
    <div
      className="device__group"
      style={{
        background: `${group.backgroundColor}`,
        color: `${group.textColor}`,
        height: `${din.groupHeight + 8}px`,
      }}
    >
      <TextareaAutosize
        placeholder="Группа"
        ref={textareaRef}
        value={text}
        onFocus={(e) => {
          setTimeout(function () {
            e.target.selectionStart = e.target.selectionEnd = 10000;
          }, 0);
        }}
        onChange={(e) => {
          const currentHeight = textareaRef.current.clientHeight;

          if (currentHeight !== group.height) {
            dispatch(setGroupInputHeight({ currentHeight, groupId }));

            dispatch(
              setHeight({
                type: 'groupHeight',
                height: getMaxGroupHeight(dinId, currentHeight, main, groupId),
                dinId,
              })
            );
          }
          setText(e.target.value);
        }}
        onBlur={(e) => {
          if (group.text !== text) {
            dispatch(
              updateGroupText({
                groupId,
                text: e.target.value,
              })
            );
          }
        }}
      />
    </div>
  );
}
