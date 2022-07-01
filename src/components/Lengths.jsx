import React from 'react';
import { useSelector } from 'react-redux';

import { getDevicesWidth } from '../functions';

export default function Lengths() {
  const devices = useSelector((state) => state.devices);
  const settings = useSelector((state) => state.settings);
  const devicesWidth = getDevicesWidth(devices.groups);

  return (
    <div className="lengths">
      <div className="total-height">
        Общая длина аппаратов:
        <span className="total-height__value">{devicesWidth}</span>
        мм
      </div>

      <div className="total-height">
        Высота стикеров (без учёта примечаний):
        <span className="total-height__value">{settings.devicesHeight}</span>
        мм
      </div>
    </div>
  );
}
