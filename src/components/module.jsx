import React from 'react';

export default function Module(props) {
  const { moduleName: defaulValue = 'L1', width = 18 } = props.module;
  return (
    <div className="single-module__phase" style={{ width: `${width}mm` }}>
      <select
        className="single-module__phase-select"
        defaultValue={defaulValue}
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

      <div className="single-module__id">{props.id}</div>
    </div>
  );
}
