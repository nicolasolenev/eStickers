import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addGroup } from '../../store/devicesSlice';
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
          dispatch(addGroup({ theme: settings.palette.theme }));
          dispatch(pushState({ groups: devices.groups, settings }));
        }}
      >
        +
      </button>
    </div>
  );
}
