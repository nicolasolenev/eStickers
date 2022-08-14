import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DeviceMultilineInput from './deviceComponents/deviceMultilineInput';
import Device from './device';
// import DeviceWarning from './deviceComponents/deviceWarning';
import Ruler from './deviceComponents/ruler';
import { getGroupWidth } from '../functions';
import { updateDeviceText } from '../store/devicesSlice';

export default function Group({ dinId, groupId }) {
  const dispatch = useDispatch();

  const group = useSelector((state) => state.groupsNew.groups[groupId]);

  return (
    <div
      className="group-wrapper"
      // style={{ width: `calc(${getGroupWidth(group)}mm + 1px)` }}
    >
      {/* <div className="warning-wrapper">
        {group.map((deviceId) => (
          <DeviceWarning
            key={deviceId}
            deviceId={deviceId}
            handler={(e) => {
              dispatch(
                updateDeviceText({
                  deviceId: deviceId,
                  groupId: group.id,
                  text: e.target.value,
                  key: 'warning',
                  dinId,
                })
              );
            }}
          />
        ))}
      </div> */}

      <DeviceMultilineInput
        deviceId={groupId}
        type="group"
        placeholder="Группа"
      />

      <div
        className="group-devices"
        style={{
          background: `${group.backgroundColor}`,
          color: `${group.textColor}`,
        }}
      >
        {group.devices.map((deviceId) => {
          return <Device key={deviceId} deviceId={deviceId} />;
        })}
      </div>

      {/* <div className="rulers-wrapper">
        {group.map((deviceId) => (
          <div key={deviceId} className="rulers">
            <Ruler deviceId={deviceId} groupId={group.id} dinId={dinId} />
          </div>
        ))}
      </div> */}
    </div>
  );
}
