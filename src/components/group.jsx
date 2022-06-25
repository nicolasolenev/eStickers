import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DeviceMultilineInput from './deviceComponents/deviceMultilineInput';
import Device from './device';
import DeviceWarning from './deviceComponents/deviceWarning';
import Ruler from './deviceComponents/ruler';
import { getGroupWidth } from '../functions';
import { updateDeviceText } from '../store/devicesSlice';

export default function Group({ group, moduleId }) {
  const devices = useSelector((state) => state.devices);
  const dispatch = useDispatch();
  let count = moduleId;

  return (
    <div
      className="group-wrapper"
      style={{ width: `${getGroupWidth(group)}mm` }}
    >
      <div className="warning-wrapper">
        {group.devices.map((device) => (
          <DeviceWarning
            key={device.id}
            device={device}
            group={group}
            handler={(e) => {
              dispatch(
                updateDeviceText({
                  deviceId: device.id,
                  groupId: group.id,
                  text: e.target.value,
                  key: 'warning',
                })
              );
            }}
          />
        ))}
      </div>

      <DeviceMultilineInput
        type="group"
        device={group}
        groupId={group.id}
        placeholder="Группа"
        handler={(e) => {
          dispatch(
            updateDeviceText({
              groupId: group.id,
              text: e.target.value,
              key: 'group',
            })
          );
        }}
      />

      <div
        className="group-devices"
        style={{
          background: `${group.backgroundColor}`,
          color: `${group.textColor}`,
        }}
      >
        {group.devices.map((device, index) => {
          const moduleId = count;
          count = count + device.modules.module.length;
          return (
            <Device
              key={device.id}
              groupId={group.id}
              moduleId={moduleId}
              device={device}
            />
          );
        })}
      </div>

      <div className="rulers-wrapper">
        {group.devices.map((device) => (
          <div key={device.id} className="rulers">
            <Ruler device={device} groupId={group.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
