import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setModuleName } from '../../store/devicesSlice';

export default function Module(props) {
  const { id, module, deviceId } = props;
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  return (
    <div
      className="device__module"
      style={{ width: `${module.width < 8 ? 8 : module.width}mm` }}
    >
      <input
        className="device__module-input"
        placeholder="L1"
        value={module.moduleName}
        onChange={(e) =>
          dispatch(
            setModuleName({
              name: e.target.value,
              deviceId,
              moduleId: module.id,
            })
          )
        }
      />

      <div className="device__id theme-gray">{id}</div>
    </div>
  );
}
