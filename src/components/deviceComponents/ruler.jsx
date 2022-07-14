import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setModuleWidth } from '../../store/devicesSlice';

export default function Ruler(props) {
  const dispatch = useDispatch();
  const { device, groupId } = props;
  const devices = useSelector((state) => state.devices);
  const [width, setWidth] = useState();
  const deviceId = device.id;
  const deviceWidth = Number(device.modules.width).toFixed(1);
  const selectedDevicesIds = devices.selected.map((item) => item.deviceId);

  function saveWidth(e) {
    const width = Number(e.target.value).toFixed(1);

    dispatch(
      setModuleWidth({
        width,
        deviceId,
        groupId,
      })
    );
    setWidth(null);
  }

  return (
    <div
      className="ruler"
      style={{
        width: `calc(${deviceWidth}mm)`,
      }}
    >
      <input
        className="ruler__input"
        type="number"
        placeholder={10}
        step={0.1}
        value={width ?? deviceWidth}
        onChange={(e) => setWidth(e.target.value)}
        onKeyDown={(e) => {
          if (
            (e.code === 'Enter' || e.code === 'NumpadEnter') &&
            e.target.value !== deviceWidth
          ) {
            saveWidth(e);
          }

          if (e.code === 'KeyE') {
            e.preventDefault();
          }
        }}
        onFocus={(e) => {
          e.target.select();
        }}
        onBlur={(e) => {
          if (e.target.value !== deviceWidth) {
            saveWidth(e);
          }
        }}
      />
      <div
        className="ruler__red-line"
        style={{
          background: `${
            selectedDevicesIds.includes(deviceId) ? '#e30000' : 'transparent'
          }`,
        }}
      ></div>
    </div>
  );
}
