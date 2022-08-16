import React, { useRef, useState } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { useSelector, useDispatch } from 'react-redux';

import { getMaxGroupHeight } from '../../functions';
import {
  setGroupInputHeight,
  updateGroupText,
} from '../../store/groupsSliceNew';
import { setHeight } from '../../store/dinsSliceNew';

export default function DeviceMultilineGroup({ groupId, dinId }) {
  const dispatch = useDispatch();

  const din = useSelector((state) => state.dinsNew.dins[dinId]);
  const groups = useSelector((state) => state.groupsNew.groups);
  const group = groups[groupId];

  const [text, setText] = useState(group.text);
  const textareaRef = useRef();

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
                height: getMaxGroupHeight(
                  groups,
                  dinId,
                  groupId,
                  currentHeight
                ),
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
