import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateSelected } from '../../store/settingsSlice';

export default function ModuleId({ deviceId, id }) {
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices);

  return (
    <div
      className="device__id theme-gray"
      onClick={(e) => {
        let shift = false;
        if (e.shiftKey) {
          shift = true;
        }
        dispatch(updateSelected({ deviceId, devices, shift }));
      }}
    >
      {id}
    </div>
  );
}
