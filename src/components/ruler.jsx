import React from 'react';
import { getDevicesWithChangedModuleWidth } from '../functions';

export default function Ruler(props) {
  const { devices, deviceId, moduleId } = props;

  function onChangeHandler(e) {
    const width = e.target.value < 8 ? 8 : e.target.value;
    props.setWidth(
      getDevicesWithChangedModuleWidth(devices, deviceId, moduleId, width)
    );
  }

  return (
    <div
      className="ruler"
      style={{
        width: `${props.width}mm`,
      }}
    >
      <input
        className="ruler__input"
        defaultValue={props.width}
        type="number"
        min={8}
        max={287}
        onChange={onChangeHandler}
      />
    </div>
  );
}
