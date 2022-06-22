import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addDevice } from '../../store/devicesSlice';
import { pushState } from '../../store/historySlice';

export default function AddDeviceButton() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const devices = useSelector((state) => state.devices);

  return (
    <div className="devices__add">
      <button
        className="devices__add-btn"
        onClick={() => {
          dispatch(addDevice(settings.palette.theme));
          dispatch(pushState({ devices, settings }));
        }}
      >
        +
      </button>
    </div>
  );
}
