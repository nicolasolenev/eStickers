import React, { useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';

import Group from './group';
import Rulers from './devicesComponents/rulers';
import AddDeviceButton from './devicesComponents/addDeviceButton';
import { getClasses, getGroups } from '../functions';

export default function Devices() {
  const settings = useSelector((state) => state.settings);
  const devices = useSelector((state) => state.devices);
  const devicesRef = useRef();

  const devicesClasses = useMemo(
    () => getClasses('devices numeration', settings.display),
    [settings.display]
  );

  const groups = getGroups(devices);

  let count = 1;

  return (
    <div className="devices-wrapper">
      <div
        className={devicesClasses}
        style={{ width: `${settings.paperWidth}mm` }}
        ref={devicesRef}
      >
        <Rulers />

        {Object.entries(groups).map(([key, arr]) => {
          const id = count;
          count =
            count +
            arr
              .map((id) => devices[id].modules.value.length)
              .reduce((sum, current) => sum + current, 0);

          return <Group key={key} arrayOfDevicesId={arr} id={id} />;
        })}

        <AddDeviceButton />
      </div>
    </div>
  );
}
