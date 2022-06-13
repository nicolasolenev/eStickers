import React from 'react';
import { useSelector } from 'react-redux';

import { getDevicesWidth } from '../../functions';

export default function Rulers() {
  const devices = useSelector((state) => state.devices);
  const settings = useSelector((state) => state.devices);

  const devicesWidth = getDevicesWidth(devices);

  return (
    <>
      <div
        className="devices__ruler"
        style={{
          width: `${devicesWidth}mm`,
          maxWidth: `${settings.paperWidth - 10}mm`,
        }}
      >
        {devicesWidth} мм
      </div>

      <div className="devices__ruler-height">{`мм`}</div>
    </>
  );
}
