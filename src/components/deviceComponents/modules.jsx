import React from 'react';

import Module from './module';

export default function Modules({
  device,
  groupId,
  deviceId,
  moduleId,
  dinId,
}) {
  return (
    <div className="device__modules">
      {device.modules.module.map((module, index) => (
        <Module
          key={module.id}
          id={moduleId + index}
          module={module}
          groupId={groupId}
          deviceId={deviceId}
          dinId={dinId}
        />
      ))}
    </div>
  );
}
