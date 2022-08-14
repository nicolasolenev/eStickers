import { nanoid } from 'nanoid';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { addGroup } from '../../store/devicesSlice';
import { addDevice } from '../../store/devicesSliceNew';
import { pushState } from '../../store/historySlice';
import { addModule } from '../../store/modulesSliceNew';
import { addGroup } from '../../store/groupsSliceNew';
import { addGroupAtDin } from '../../store/dinsSliceNew';

export default function AddDeviceButton({ dinId }) {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const devices = useSelector((state) => state.devices);

  return (
    <div className="devices__add">
      <button
        className="devices__add-btn"
        onClick={() => {
          // dispatch(addGroup({ theme: settings.palette.theme, dinId }));
          // dispatch(pushState({ groups: devices.groups, settings }));
          const moduleId = nanoid();
          const deviceId = nanoid();
          const groupId = nanoid();
          dispatch(addModule({ moduleId, dinId }));
          dispatch(addDevice({ deviceId, moduleId }));
          dispatch(addGroup({ groupId, deviceId }));
          dispatch(addGroupAtDin({ dinId, groupId }));
        }}
      >
        +
      </button>
    </div>
  );
}
