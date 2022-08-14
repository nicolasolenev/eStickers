import React, { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DevicePoint from './deviceComponents/devicePoint';
import DeviceMultilineInput from './deviceComponents/deviceMultilineInput';
import DeviceField from './deviceComponents/deviceField';
import Modules from './deviceComponents/modules';
import { updateDeviceText, addDeviceBefore } from '../store/devicesSlice';
import { pushState } from '../store/historySlice';
import { getDeviceTotalWidth } from '../functions';

export default function Device({ deviceId }) {
  const dispatch = useDispatch();
  const device = useSelector((state) => state.devicesNew.devices[deviceId]);
  const settings = useSelector((state) => state.settings);

  // const deviceWidth = useMemo(() => {
  //   const width = getDeviceTotalWidth(device);
  //   return `calc(${width}mm + 1px)`;
  // }, [device]);

  // const deviceInputHandler = useCallback(
  //   function (e, key) {
  //     dispatch(
  //       updateDeviceText({
  //         deviceId,
  //         groupId,
  //         text: e.target.value,
  //         key,
  //         dinId,
  //       })
  //     );
  //   },
  //   [deviceId, groupId, dispatch]
  // );

  return (
    <div
      // className={
      //   devices.selected.map((item) => item.deviceId).includes(deviceId)
      //     ? 'device selected'
      //     : 'device'
      // }
      className={'device'}
      // style={{
      //   width: `${deviceWidth}`,
      // }}
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
        // handler={deviceInputHandler}
      />

      {/* <DeviceMultilineInput
        type="description"
        device={device}
        groupId={groupId}
        handler={deviceInputHandler}
        placeholder="Название"
        dinId={dinId}
      /> */}

      <Modules deviceId={deviceId} />
    </div>
  );
}
