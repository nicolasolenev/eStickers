import React, { useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Group from './group';
import AddDeviceButton from './devicesComponents/addDeviceButton';
import { getClasses } from '../functions';

// const dpi = document.getElementById('dpi').offsetHeight;

export default function Devices(props) {
  const settings = useSelector((state) => state.settings);
  const devices = useSelector((state) => state.devices);
  const { devicesRef } = props;
  const borderColor = settings.palette.borderColor;

  let count = 1;

  const devicesClasses = useMemo(
    () => getClasses(`devices numeration ${borderColor}`, settings.display),
    [settings.display, borderColor]
  );

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
