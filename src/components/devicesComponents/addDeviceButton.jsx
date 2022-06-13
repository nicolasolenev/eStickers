import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addDevice } from '../../store/devicesSlice';

export default function AddDeviceButton() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  return (
    <div className="devices__add">
      <button
        className="devices__add-btn"
        onClick={() => {
          dispatch(addDevice(settings.palette.theme));
        }}
      >
        +
      </button>
    </div>
  );
}
