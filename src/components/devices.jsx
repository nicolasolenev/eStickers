import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Group from './group';
import AddDeviceButton from './devicesComponents/addDeviceButton';
import { getClasses, getDpMM } from '../functions';
import { setDevicesHeight } from '../store/settingsSlice';

// const dpi = document.getElementById('dpi').offsetHeight;

export default function Devices(props) {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const devices = useSelector((state) => state.devices);
  const { devicesRef } = props;
  const borderColor = settings.palette.borderColor;

  let count = 1;

  const devicesClasses = useMemo(
    () => getClasses(`devices numeration ${borderColor}`, settings.display),
    [settings.display, borderColor]
  );

  useEffect(() => {
    const heightPixels = [...devicesRef.current.firstChild.children]
      .slice(1, 3)
      .map((el) => el.offsetHeight)
      .reduce((sum, h) => sum + h, 0);

    const heightMm = heightPixels / getDpMM().h;
    const height = Math.round(heightMm * 10) / 10;

    dispatch(setDevicesHeight({ height }));
  });

  return (
    <div className="devices-wrapper">
      <div
        className={devicesClasses}
        style={{ width: `${settings.paperWidth}mm` }}
        ref={devicesRef}
      >
        {devices.groups.map((group) => {
          const moduleId = count;

          count =
            count +
            group.devices
              .map((device) => device.modules.module.length)
              .reduce((sum, current) => sum + current, 0);

          return (
            <Group
              key={group.devices[0].id}
              group={group}
              moduleId={moduleId}
            />
          );
        })}

        <AddDeviceButton />
      </div>
    </div>
  );
}
