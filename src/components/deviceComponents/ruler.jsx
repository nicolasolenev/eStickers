import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setModuleWidth } from '../../store/devicesSlice';

export default function Ruler(props) {
  const { deviceId, moduleId } = props;
  const [width, setWidth] = useState();
  const device = useSelector((state) => state.devices)[deviceId];
  const settings = useSelector((state) => state.settings);
  const moduleWidth = Number(
    device.modules.value.find((module) => module.id === moduleId).width
  ).toFixed(1);
  const dispatch = useDispatch();

  function saveWidth(e) {
    const width = e.target.value < 8 ? 8.0 : Number(e.target.value).toFixed(1);
    dispatch(
      setModuleWidth({
        width,
        deviceId,
        moduleId,
        selected: settings.selected,
      })
    );
    setWidth(null);
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
        type="number"
        placeholder={10}
        step={0.1}
        value={width ?? moduleWidth}
        onChange={(e) => setWidth(e.target.value)}
        onKeyDown={(e) => {
          if (e.code === 'Enter' || e.code === 'NumpadEnder') {
            saveWidth(e);
          }
        }}
        onBlur={saveWidth}
      />
    </div>
  );
}