import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateSelected } from '../../store/settingsSlice';

export default function ModuleId({ deviceId, id }) {
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices);
  const settings = useSelector((state) => state.settings);

  const onClickHandler = (e) => {
    let shift = false;
    if (e.shiftKey) {
      shift = true;
    }
    dispatch(updateSelected({ deviceId, devices, shift }));
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
