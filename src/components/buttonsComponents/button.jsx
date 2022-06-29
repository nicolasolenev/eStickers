import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { combineDevices } from '../../store/devicesSlice';
import { pushState } from '../../store/historySlice';

export default function ButtonMerge({ isDisabled }) {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const devices = useSelector((state) => state.devices);
  const [hovering, setHovering] = useState(false);

  let hover = false;

  return (
    <div className="button-wrapper">
      <button
        className="button"
        disabled={isDisabled}
        onClick={() => {
          if (!devices.selected.length) {
            return;
          }
          dispatch(combineDevices());
          dispatch(pushState({ groups: devices.groups, settings }));
        }}
        onMouseOver={() => {
          hover = true;
          setTimeout(() => {
            if (hover) {
              setHovering(true);
            }
          }, 1500);
        }}
        onMouseOut={() => {
          hover = false;
          setHovering(false);
        }}
      >
        Объединить
      </button>

      {hovering && <div className="button-tip"> Ctrl + A </div>}
    </div>
  );
}
