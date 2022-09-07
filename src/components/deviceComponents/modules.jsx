import React from 'react';
import { useSelector } from 'react-redux';

import Module from './module';

export default function Modules({ deviceId, groupId, dinId }) {
  const device = useSelector((state) => state.main.devices[deviceId]);
  // const device = useSelector((state) => state.devicesNew.devices[deviceId]);

  return (
    <div className="device__modules">
      {device.modules.map((moduleId) => (
        <Module
          key={moduleId}
          moduleId={moduleId}
          deviceId={deviceId}
          groupId={groupId}
          dinId={dinId}
        />
      ))}
    </div>
  );
}
