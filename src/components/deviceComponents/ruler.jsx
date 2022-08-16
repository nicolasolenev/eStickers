import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setDeviceWidth } from '../../store/devicesSliceNew';

export default function Ruler({ deviceId, groupId, dinId }) {
  const dispatch = useDispatch();
  const [width, setWidth] = useState();
  const selectedDevicesIds = useSelector((state) => state.devicesNew.selected);
  const devices = useSelector((state) => state.devicesNew.devices);
  const device = devices[deviceId];

  const deviceWidth = device.width;

  function saveWidth(e) {
    const width = Number(e.target.value).toFixed(1);

    dispatch(
      setDeviceWidth({
        width,
        deviceId,
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
        inputMode="decimal"
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
