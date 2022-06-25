import React, { useRef, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Group from './group';
import AddDeviceButton from './devicesComponents/addDeviceButton';
import { getClasses, getGroups } from '../functions';
import { pushState } from '../store/historySlice';
import { updateSelected } from '../store/devicesSlice';

// const dpi = document.getElementById('dpi').offsetHeight;

export default function Devices(props) {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const devices = useSelector((state) => state.devices);
  const history = useSelector((state) => state.history);
  const { devicesRef } = props;
  const borderColor = settings.palette.borderColor;

  const devicesClasses = useMemo(
    () => getClasses(`devices numeration ${borderColor}`, settings.display),
    [settings.display, borderColor]
  );

  let count = 1;

  useEffect(() => {
    // console.log(document.getElementById('dpi').offsetHeight);
    // console.log(
    //   ((devicesRef.current.firstChild.offsetHeight - 19 - 48) * 25.4) / dpi
    // );
    // dispatch(pushState({ devices, settings }));
  }, []);

  return (
    <div className="devices-wrapper">
      {/* <div className="devices__height-ruler">10 мм</div> */}

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
