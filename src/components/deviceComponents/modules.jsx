import React from 'react';
import { useSelector } from 'react-redux';

import Module from './module';

export default function Modules({ deviceId, dinId }) {
  const device = useSelector((state) => state.devicesNew.devices[deviceId]);

  return (
    <div className="device__modules">
      {device.modules.map((moduleId) => (
        <Module
          key={moduleId}
          moduleId={moduleId}
          deviceId={deviceId}
          dinId={dinId}
        />
      ))}
    </div>
  );
}
