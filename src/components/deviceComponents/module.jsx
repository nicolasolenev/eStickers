import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import ModuleId from './moduleId';
import { setModuleText } from '../../store/devicesSlice';

export default function Module({ id, module, groupId, deviceId, dinId }) {
  const dispatch = useDispatch();
  const [text, setText] = useState(module.text);

  const inputHandler = (e) =>
    dispatch(
      setModuleText({
        text: e.target.value,
        deviceId,
        groupId,
        moduleId: module.id,
        dinId,
      })
    );

  return (
    <div className="device__module" style={{ width: `${module.width}mm` }}>
      <input
        className="device__module-input"
        placeholder="L1"
        value={text}
        onFocus={(e) => {
          setTimeout(function () {
            e.target.selectionStart = e.target.selectionEnd = 10000;
          }, 0);
        }}
        onChange={(e) => setText(e.target.value)}
        onBlur={inputHandler}
      />

      <ModuleId
        groupId={groupId}
        deviceId={deviceId}
        moduleId={module.id}
        id={id}
        dinId={dinId}
      />
    </div>
  );
}
