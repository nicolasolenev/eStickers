import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setModuleWidth } from '../../store/devicesSlice';

export default function Ruler(props) {
  const dispatch = useDispatch();
  const { device } = props;
  const deviceId = device.id;
  const [width, setWidth] = useState();
  const settings = useSelector((state) => state.settings);
  const deviceWidth = Number(device.modules.totalWidth).toFixed(1);
  // const moduleWidth = Number(
  //   device.modules.value.find((module) => module.id === moduleId).width
  // ).toFixed(1);

  function saveWidth(e) {
    const width = Number(e.target.value).toFixed(1);

    dispatch(
      setModuleWidth({
        width,
        deviceId,
        selected: settings.selected,
      })
    );
    setWidth(null);
  }

  return (
    <div
      className="ruler"
      style={{
        width: `${deviceWidth}mm`,
      }}
    >
      <input
        className="ruler__input"
        type="number"
        placeholder={10}
        step={0.1}
        value={width ?? deviceWidth}
        onChange={(e) => setWidth(e.target.value)}
        onKeyDown={(e) => {
          if (e.code === 'Enter' || e.code === 'NumpadEnder') {
            saveWidth(e);
          }

          if (e.code === 'KeyE') {
            e.preventDefault();
          }
        }}
        onBlur={saveWidth}
      />
    </div>
  );
}
