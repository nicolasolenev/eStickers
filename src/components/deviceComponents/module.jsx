import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import ModuleId from './moduleId';
import { setModuleName } from '../../store/devicesSlice';

export default function Module({ id, module, deviceId }) {
  const dispatch = useDispatch();
  const [text, setText] = useState(module.moduleName);

  const inputHandler = (e) =>
    dispatch(
      setModuleName({
        name: e.target.value,
        deviceId,
        moduleId: module.id,
      })
    );

  return (
    <div className="device__module" style={{ width: `${module.width}mm` }}>
      <input
        className="device__module-input"
        placeholder="L1"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={inputHandler}
      />

      <ModuleId deviceId={deviceId} id={id} />
    </div>
  );
}
