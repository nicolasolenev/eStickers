import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getClasses, getDpMM, getHeights } from '../functions';
import { setDevicesHeight } from '../store/settingsSlice';
import AddDinBtn from './devicesComponents/addDinBtn';
import Din from './din';

const DpMM = getDpMM();

export default function Devices({ devicesRef }) {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  // const devices = useSelector((state) => state.devices);
  const borderColor = settings.palette.borderColor;

  const devicesClasses = useMemo(
    () => getClasses(`devices ${borderColor}`, settings.display),
    [settings.display, borderColor]
  );

  const dins = useSelector((state) => state.dinsNew.dins);

  useEffect(() => {
    // const heights = getHeights(devicesRef, DpMM);
    // if (
    //   settings.devicesHeight.fields !== heights.fields ||
    //   settings.devicesHeight.warnings !== heights.warnings
    // ) {
    //   dispatch(setDevicesHeight({ heights }));
    // }
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
        {Object.entries(dins).map(([id, { groups }]) => (
          <Din key={id} dinId={id} groupsId={groups} />
        ))}

        <AddDinBtn />
      </div>
    </div>
  );
}
