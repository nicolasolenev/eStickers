import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DeviceMultilineGroup from './deviceComponents/deviceMultilineGroup';
import Device from './device';
import DeviceWarning from './deviceComponents/deviceWarning';
import Ruler from './deviceComponents/ruler';
import { getGroupWidth } from '../functions';
import { updateDeviceText } from '../store/devicesSlice';

export default function Group({ dinId, groupId }) {
  const dispatch = useDispatch();

  const group = useSelector((state) => state.main.groups[groupId]);
  const devices = useSelector((state) => state.main.devices);
  // const group = useSelector((state) => state.groupsNew.groups[groupId]);
  // const devices = useSelector((state) => state.devicesNew.devices);

  return (
    <div
      className="group-wrapper"
      style={{ width: `calc(${getGroupWidth(group, devices)}mm + 1px)` }}
      // style={{ width: `calc(18mm + 1px)` }}
    >
      <div className="warning-wrapper">
        {group.devices.map((deviceId) => (
          <DeviceWarning key={deviceId} deviceId={deviceId} dinId={dinId} />
        ))}
      </div>

      <DeviceMultilineGroup groupId={groupId} dinId={dinId} />

      <div
        className="group-devices"
        style={{
          background: `${group.backgroundColor}`,
          color: `${group.textColor}`,
        }}
      >
        {group.devices.map((deviceId) => {
          return (
            <Device
              key={deviceId}
              deviceId={deviceId}
              groupId={groupId}
              dinId={dinId}
            />
          );
        })}
      </div>

      <div className="rulers-wrapper">
        {group.devices.map((deviceId) => (
          <div key={deviceId} className="rulers">
            <Ruler deviceId={deviceId} groupId={groupId} dinId={dinId} />
          </div>
        ))}
      </div>
    </div>
  );
}
