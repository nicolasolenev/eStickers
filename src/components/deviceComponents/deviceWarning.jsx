import React from 'react';
import { MultilineInput } from 'react-input-multiline';

export default function DeviceWarning({ device, handler }) {
  return (
    <div
      className="device__warning"
      style={{
        background: `${device.warning.backgroundColor}`,
        color: `${device.warning.textColor}`,
      }}
    >
      <MultilineInput
        value={device.warning.text}
        onChange={(e) => {
          handler(e, 'warning');
        }}
        additionalClasses={['device__warning-text']}
        placeholder="Warning"
      />
    </div>
  );
}
