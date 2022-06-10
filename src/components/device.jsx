import React, { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Ruler from './deviceComponents/ruler';
import DeviceHoverBtns from './deviceComponents/deviceHoverBtns';
import DevicePoint from './deviceComponents/devicePoint';
import DeviceMultilineInput from './deviceComponents/deviceMultilineInput';
import DeviceField from './deviceComponents/deviceField';
import DeviceWarning from './deviceComponents/deviceWarning';
import Modules from './deviceComponents/modules';
import { updateDeviceText } from '../store/devicesSlice';
import { getDeviceTotalWidth } from '../functions';

export default function Device({ device, id }) {
  const deviceId = device.id;
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const deviceWidth = useMemo(() => getDeviceTotalWidth(device), [device]);

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
      <DeviceHoverBtns device={device} />

      {device.warning.isActive && (
        <DeviceWarning device={device} handler={deviceInputHandler} />
      )}

      {/* <DeviceField
        name="group"
        placeholder="Группа"
        device={device}
        handler={deviceInputHandler}
      /> */}
      <DeviceMultilineInput
        type="group"
        device={device}
        handler={deviceInputHandler}
        placeholder="Группа"
      />

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

      <div className="rulers">
        {device.modules.value.map((module) => (
          <Ruler key={module.id} deviceId={deviceId} moduleId={module.id} />
        ))}
      </div>
    </div>
  );
}
