import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setModuleWidth } from '../store/devicesSlice';

export default function Ruler(props) {
  const { deviceId, moduleId } = props;
  const device = useSelector((state) => state.devices)[deviceId];
  const moduleWidth = device.modules.find(
    (module) => module.id === moduleId
  ).width;
  const dispatch = useDispatch();

  function onChangeHandler(e) {
    const width = e.target.value;
    dispatch(setModuleWidth({ width, deviceId, moduleId }));
  }

  return (
    <div
      className="ruler"
      style={{
        width: `${moduleWidth < 8 ? 8 : moduleWidth}mm`,
      }}
    >
      <input
        className="ruler__input"
        value={moduleWidth}
        placeholder="8"
        type="number"
        min={8}
        max={287}
        onChange={onChangeHandler}
      />
    </div>
  );
}
