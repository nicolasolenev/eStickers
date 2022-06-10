import React from 'react';
import TextareaAutosize from 'react-autosize-textarea';

export default function DeviceWarning({ device, handler }) {
  return (
    <div
      className="device__warning"
      style={{
        background: `${device.warning.backgroundColor}`,
        color: `${device.warning.textColor}`,
      }}
    >
      {/* <MultilineInput
        value={device.warning.text}
        onChange={(e) => {
          handler(e, 'warning');
        }}
        additionalClasses={['device__warning-text']}
        placeholder="Warning"
      /> */}
      <TextareaAutosize
        placeholder="Примеч."
        onChange={(e) => {
          handler(e, 'warning');
        }}
      />
    </div>
  );
}
