import React from 'react';
import { useDispatch } from 'react-redux';

import ModuleId from './moduleId';
import { setModuleName } from '../../store/devicesSlice';

export default function Module({ id, module, deviceId }) {
  const dispatch = useDispatch();

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
        value={module.moduleName}
        onChange={inputHandler}
      />

      <ModuleId deviceId={deviceId} id={id} />
    </div>
  );
}
