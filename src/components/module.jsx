import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setModuleName } from '../store/devicesSlice';

export default function Module(props) {
  const {
    moduleName: defaulValue = 'L1',
    width = 18,
    id: moduleId,
  } = props.module;

  const { deviceId, id } = props;

  const dispatch = useDispatch();

  return (
    <div className="single-module__phase" style={{ width: `${width}mm` }}>
      <select
        className="single-module__phase-select"
        value={defaulValue}
        onChange={(e) =>
          dispatch(setModuleName({ name: e.target.value, deviceId, moduleId }))
        }
      >
        <option className="phase-l1" value="L1">
          L1
        </option>
        <option className="phase-l2" value="L2">
          L2
        </option>
        <option className="phase-l3" value="L3">
          L3
        </option>
        <option className="phase-n" value="N">
          N
        </option>
      </select>

      <div className="single-module__id">{id}</div>
    </div>
  );
}
