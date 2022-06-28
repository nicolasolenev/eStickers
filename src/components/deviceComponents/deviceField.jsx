import React, { useState } from 'react';

export default function DeviceField({ name, placeholder, device, handler }) {
  const [text, setText] = useState(device.switch.text);

  return (
    <div className={`device__${name}`}>
      <input
        className={`device__${name}-input`}
        placeholder={placeholder}
        value={text}
        onFocus={(e) => {
          setTimeout(function () {
            e.target.selectionStart = e.target.selectionEnd = 10000;
          }, 0);
        }}
        onChange={(e) => setText(e.target.value)}
        onBlur={(e) => {
          if (device.switch.text !== text) {
            handler(e, name);
          }
        }}
      ></input>
    </div>
  );
}
