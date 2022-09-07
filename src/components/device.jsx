import React, { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DevicePoint from './deviceComponents/devicePoint';
import DeviceMultilineDescription from './deviceComponents/DeviceMultilineDescription';
import DeviceField from './deviceComponents/deviceField';
import Modules from './deviceComponents/modules';
// import { updateDeviceText, addDeviceBefore } from '../store/devicesSlice';
import { updateDeviceText } from '../store/devicesSliceNew';
import { pushState } from '../store/historySlice';
import { getDeviceTotalWidth } from '../functions';

export default function Device({ deviceId, dinId, groupId }) {
  const dispatch = useDispatch();
  const device = useSelector((state) => state.main.devices[deviceId]);
  // const device = useSelector((state) => state.devicesNew.devices[deviceId]);
  const settings = useSelector((state) => state.settings);

  const deviceWidth = useMemo(() => {
    const width = device.width;
    return `calc(${width}mm + 1px)`;
  }, [device]);

  const deviceInputHandler = useCallback(
    function (e) {
      dispatch(
        updateDeviceText({
          deviceId,
          text: e.target.value,
          type: 'switch',
        })
      );
    },
    [deviceId, dispatch]
  );

  return (
    <div
      // className={
      //   devices.selected.map((item) => item.deviceId).includes(deviceId)
      //     ? 'device selected'
      //     : 'device'
      // }
      className={'device'}
      style={{
        width: `${deviceWidth}`,
        // width: `calc(18mm + 1px)`,
      }}
    >
      {/* <div className="addDeviceBefore">
        <button
          className="addDeviceBefore-btn"
          onClick={() => {
            dispatch(
              addDeviceBefore({
                theme: settings.palette.theme,
                groupIndex,
                index,
              })
            );
            dispatch(pushState({ groups: devices.groups, settings }));
          }}
        >
          +
        </button>
      </div> */}
      <DevicePoint deviceId={deviceId} />

      <DeviceField
        name="switch"
        placeholder="QF1"
        device={device}
        deviceId={deviceId}
        handler={deviceInputHandler}
      />

      <DeviceMultilineDescription deviceId={deviceId} dinId={dinId} />

      <Modules deviceId={deviceId} groupId={groupId} dinId={dinId} />
    </div>
  );
}
