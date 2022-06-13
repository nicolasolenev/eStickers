import React from 'react';

import Module from './module';

export default function Modules({ device, deviceId, id }) {
  return (
    <div
      className="device__modules"
      style={
        {
          // background: `${device.modules.backgroundColor}`,
          // color: `${device.modules.textColor}`,
        }
      }
    >
      {device.modules.value.map((module, index) => (
        <Module
          key={module.id}
          id={id + index}
          module={module}
          deviceId={deviceId}
        />
      ))}
    </div>
  );
}
