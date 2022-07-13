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
    // return index === 0 ? `calc(${width}mm)` : `calc(${width}mm + 1px)`;
    return `calc(${width}mm + 1px)`;
  }, [device]);

  // console.log(deviceWidth);

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
        // width: `calc(${deviceWidth}mm + 1px)`,
        width: `${deviceWidth}`,
        // width: `${deviceWidth}mm`,
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
