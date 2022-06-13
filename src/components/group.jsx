import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DeviceMultilineInput from './deviceComponents/deviceMultilineInput';
import Device from './device';
import DeviceWarning from './deviceComponents/deviceWarning';
import Ruler from './deviceComponents/ruler';
import { getGroupWidth } from '../functions';
import { updateDeviceText } from '../store/devicesSlice';

export default function Group({ arrayOfDevicesId, id }) {
  const devices = useSelector((state) => state.devices);
  const firstDeviceId = arrayOfDevicesId[0];
  const dispatch = useDispatch();
  let count = id;

  return (
    <div
      className="group-wrapper"
      style={{ width: `${getGroupWidth(devices, arrayOfDevicesId)}mm` }}
    >
      <div className="warning-wrapper">
        {arrayOfDevicesId.map((deviceId) => (
          <DeviceWarning
            key={deviceId}
            device={devices[deviceId]}
            handler={(e) => {
              dispatch(
                updateDeviceText({
                  deviceId: firstDeviceId,
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
        device={devices[firstDeviceId]}
        placeholder="Группа"
        handler={(e) => {
          dispatch(
            updateDeviceText({
              deviceId: firstDeviceId,
              text: e.target.value,
              key: 'group',
            })
          );
        }}
      />
      <div className="group-devices">
        {arrayOfDevicesId.map((deviceId, index) => {
          const id = count;
          count = count + devices[deviceId].modules.value.length;
          return <Device key={deviceId} id={id} device={devices[deviceId]} />;
        })}
      </div>

      <div className="rulers-wrapper">
        {arrayOfDevicesId.map((deviceId) => (
          <div key={deviceId} className="rulers">
            {devices[deviceId].modules.value.map((module) => (
              <Ruler key={module.id} deviceId={deviceId} moduleId={module.id} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
