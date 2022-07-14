import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Group from './group';
import AddDeviceButton from './devicesComponents/addDeviceButton';
import { getClasses, getDpMM, getHeights } from '../functions';
import { setDevicesHeight } from '../store/settingsSlice';

const DpMM = getDpMM();

export default function Devices({ devicesRef }) {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const devices = useSelector((state) => state.devices);
  const borderColor = settings.palette.borderColor;

  let count = 1;

  const devicesClasses = useMemo(
    () => getClasses(`devices ${borderColor}`, settings.display),
    [settings.display, borderColor]
  );

  useEffect(() => {
    const heights = getHeights(devicesRef, DpMM);

    if (settings.devicesHeight.fields !== heights.fields) {
      dispatch(setDevicesHeight({ heights }));
    }
  });

  return (
    <div className="devices-wrapper">
      <div
        className={devicesClasses}
        style={{
          width: `${settings.paperWidth}mm`,
          fontSize: `${settings.fontSize}pt`,
        }}
        ref={devicesRef}
      >
        {devices.groups.map((group, index) => {
          const moduleId = count;

          count =
            count +
            group.devices
              .map((device) => device.modules.module.length)
              .reduce((sum, current) => sum + current, 0);

          return (
            <Group
              key={group.devices[0].id}
              index={index}
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
