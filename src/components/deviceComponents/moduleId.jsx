import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateSelected } from '../../store/settingsSlice';

export default function ModuleId({ deviceId, id }) {
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices);

  const onClickHandler = (e) => {
    let shift = false;
    if (e.shiftKey) {
      shift = true;
    }
    dispatch(updateSelected({ deviceId, devices, shift }));
  };

  return (
    <div className="device__id" onClick={onClickHandler}>
      {id}
    </div>
  );
}
