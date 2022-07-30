import React from 'react';
import { useDispatch } from 'react-redux';

import DeviceMultilineInput from './deviceComponents/deviceMultilineInput';
import Device from './device';
import DeviceWarning from './deviceComponents/deviceWarning';
import Ruler from './deviceComponents/ruler';
import { getGroupWidth } from '../functions';
import { updateDeviceText } from '../store/devicesSlice';

export default function Group({ group, moduleId, index, dinId }) {
  const dispatch = useDispatch();
  const groupIndex = index;
  let count = moduleId;

  return (
    <div
      className="group-wrapper"
      style={{ width: `calc(${getGroupWidth(group)}mm + 1px)` }}
    >
      <div className="warning-wrapper">
        {group.devices.map((device) => (
          <DeviceWarning
            key={device.id}
            index={index}
            device={device}
            group={group}
            dinId={dinId}
            handler={(e) => {
              dispatch(
                updateDeviceText({
                  deviceId: device.id,
                  groupId: group.id,
                  text: e.target.value,
                  key: 'warning',
                  dinId,
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
        dinId={dinId}
        placeholder="Группа"
        handler={(e) => {
          dispatch(
            updateDeviceText({
              groupId: group.id,
              text: e.target.value,
              key: 'group',
              dinId,
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
              index={index}
              key={device.id}
              groupId={group.id}
              groupIndex={groupIndex}
              moduleId={moduleId}
              device={device}
              dinId={dinId}
            />
          );
        })}
      </div>

      <div className="rulers-wrapper">
        {group.devices.map((device) => (
          <div key={device.id} className="rulers">
            <Ruler device={device} groupId={group.id} dinId={dinId} />
          </div>
        ))}
      </div>
    </div>
  );
}
