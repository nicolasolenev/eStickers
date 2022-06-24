import React, { useRef, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useReactToPrint } from 'react-to-print';

import Group from './group';
import AddDeviceButton from './devicesComponents/addDeviceButton';
import { getClasses, getGroups } from '../functions';
import { pushState } from '../store/historySlice';

// const dpi = document.getElementById('dpi').offsetHeight;

// function getPageStyle(pageWidth) {
//   return `
//  @page {
//  size: auto ${pageWidth}mm;
//  }
// `;
// }

export default function Devices(props) {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const devices = useSelector((state) => state.devices);
  const history = useSelector((state) => state.history);
  // const devicesRef = useRef();
  const { devicesRef } = props;

  const borderColor = settings.palette.borderColor;

  const devicesClasses = useMemo(
    () => getClasses(`devices numeration ${borderColor}`, settings.display),
    [settings.display, borderColor]
  );

  const groups = getGroups(devices);

  let count = 1;

  // const handlePrint = useReactToPrint({
  //   content: () => devicesRef.current,
  //   pageStyle: getPageStyle(settings.paperWidth),
  // });

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
        {Object.entries(groups)
          .sort((a, b) => devices[a[1][0]].count - devices[b[1][0]].count)
          .map(([key, arr]) => {
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
      {/* <button style={{ position: 'absolute' }} onClick={handlePrint}>
        Print this out!
      </button> */}
    </div>
  );
}
