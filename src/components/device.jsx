import React, { useMemo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DevicePoint from './deviceComponents/devicePoint';
import DeviceMultilineInput from './deviceComponents/deviceMultilineInput';
import DeviceField from './deviceComponents/deviceField';
import Modules from './deviceComponents/modules';
import { updateDeviceText, addCount } from '../store/devicesSlice';
import { getDeviceTotalWidth } from '../functions';

export default function Device({ device, id }) {
  const dispatch = useDispatch();
  const deviceId = device.id;
  const settings = useSelector((state) => state.settings);
  const deviceWidth = useMemo(() => getDeviceTotalWidth(device), [device]);

  // useEffect(() => {
  //   dispatch(addCount({ count: id, deviceId }));
  // }, [id]);

  const deviceInputHandler = useCallback(
    function (e, key) {
      dispatch(
        updateDeviceText({
          deviceId,
          text: e.target.value,
          key,
        })
      );
    },
    [deviceId, dispatch]
  );

  return (
    <div
      className={
        settings.selected.includes(deviceId) ? 'device selected' : 'device'
      }
      style={{
        width: `${deviceWidth}mm`,
      }}
    >
      <DevicePoint device={device} dispatch={dispatch} deviceId={deviceId} />

      <DeviceField
        name="switch"
        placeholder="QF1"
        device={device}
        handler={deviceInputHandler}
      />

      <DeviceMultilineInput
        type="description"
        device={device}
        handler={deviceInputHandler}
        placeholder="Название"
      />

      <Modules device={device} deviceId={deviceId} id={id} />
    </div>
  );
}
