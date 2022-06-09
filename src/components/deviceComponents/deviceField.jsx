import React from 'react';

export default function DeviceField({ name, placeholder, device, handler }) {
  return (
    <div
      className={`device__${name}`}
      style={{ background: `${device[name].backgroundColor}` }}
    >
      <input
        className={`device__${name}-input`}
        placeholder={placeholder}
        value={device[name].text}
        style={{
          color: `${device[name].textColor}`,
        }}
        onChange={(e) => handler(e, name)}
      ></input>
    </div>
  );
}
