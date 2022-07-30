import React from 'react';
import { useSelector } from 'react-redux';

import { getDevicesWidth, getSelectedDevicesWidth } from '../functions';

export default function Lengths() {
  const devices = useSelector((state) => state.devices);
  const settings = useSelector((state) => state.settings);
  const devicesWidth = getDevicesWidth(devices.groups[0]);
  const selectedDevicesWidth = getSelectedDevicesWidth(devices);

  return (
    <div className="lengths">
      <div className="total-height">
        Длина аппаратов:
        <div className="total-height__block">
          общая –<span className="total-height__value">{devicesWidth} мм</span>
        </div>
        <div className="total-height__block">
          выделенных –
          <span className="total-height__value">{selectedDevicesWidth} мм</span>
        </div>
      </div>

      <div className="total-height">
        Высота:
        <div className="total-height__block">
          полей –
          <span className="total-height__value">
            {settings.devicesHeight.fields < 2
              ? 0
              : settings.devicesHeight.fields}{' '}
            мм
          </span>
        </div>
        <div className="total-height__block">
          примечаний –
          <span className="total-height__value">
            {settings.devicesHeight.warnings} мм
          </span>
        </div>
        <div className="total-height__block">
          модулей –
          <span className="total-height__value">
            {settings.devicesHeight.modules} мм
          </span>
        </div>
      </div>
    </div>
  );
}
