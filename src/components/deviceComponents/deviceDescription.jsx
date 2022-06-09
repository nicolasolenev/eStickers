import React from 'react';

export default function DeviceDescription({ device, handler }) {
  return (
    <div
      className="device__description"
      style={{ background: `${device.description.backgroundColor}` }}
    >
      <textarea
        rows={3}
        className="device__description-input"
        style={{ color: `${device.description.textColor}` }}
        placeholder="Надпись, название линии"
        value={device.description.text}
        onChange={(e) => handler(e, 'description')}
      ></textarea>
    </div>
  );
}
