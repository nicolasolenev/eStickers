import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateSelected } from '../../store/devicesSlice';

export default function ModuleId({ groupId, deviceId, id, dinId }) {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  const onClickHandler = (e) => {
    let shift = false;
    if (e.shiftKey) {
      shift = true;
    }
    dispatch(updateSelected({ groupId, deviceId, shift, dinId }));
  };

  return (
    <div
      className={
        settings.display.numeration
          ? 'device__id'
          : 'device__id device__id-hide'
      }
      onClick={onClickHandler}
    >
      {id}
    </div>
  );
}
