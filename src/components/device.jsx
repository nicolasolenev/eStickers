import React, { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DevicePoint from './deviceComponents/devicePoint';
import DeviceMultilineInput from './deviceComponents/deviceMultilineInput';
import DeviceField from './deviceComponents/deviceField';
import Modules from './deviceComponents/modules';
import { updateDeviceText } from '../store/devicesSlice';
import { getDeviceTotalWidth } from '../functions';

export default function Device({ device, groupId, moduleId, index }) {
  const dispatch = useDispatch();
  const deviceId = device.id;
  const devices = useSelector((state) => state.devices);
  const deviceWidth = useMemo(() => {
    const width = getDeviceTotalWidth(device);
    return `calc(${width}mm + 1px)`;
  }, [device]);

  const deviceInputHandler = useCallback(
    function (e, key) {
      dispatch(
        updateDeviceText({
          deviceId,
          groupId,
          text: e.target.value,
          key,
        })
      );
    },
    [deviceId, groupId, dispatch]
  );

  return (
    <div
      className={
        devices.selected.map((item) => item.deviceId).includes(deviceId)
          ? 'device selected'
          : 'device'
      }
      style={{
        width: `${deviceWidth}`,
      }}
    >
      <DevicePoint device={device} groupId={groupId} dispatch={dispatch} />

      <DeviceField
        name="switch"
        placeholder="QF1"
        device={device}
        handler={deviceInputHandler}
      />

      <DeviceMultilineInput
        type="description"
        device={device}
        groupId={groupId}
        handler={deviceInputHandler}
        placeholder="Название"
      />

      <Modules
        device={device}
        groupId={groupId}
        deviceId={device.id}
        moduleId={moduleId}
      />
    </div>
  );
}
