import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Group from './group';
import AddDeviceButton from './devicesComponents/addDeviceButton';
import { getClasses, getDpMM, getHeights } from '../functions';
import { setDevicesHeight } from '../store/settingsSlice';
import { addRow } from '../store/devicesSlice';

const DpMM = getDpMM();

export default function Devices({ devicesRef }) {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const devices = useSelector((state) => state.devices);
  const borderColor = settings.palette.borderColor;

  const devicesClasses = useMemo(
    () => getClasses(`devices ${borderColor}`, settings.display),
    [settings.display, borderColor]
  );

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
        {devices.groups.map((groups, id) => {
          let count = 1;

          return (
            <div className="devices__din" id={id} key={id}>
              {groups.map((group, index) => {
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
                    dinId={id}
                  />
                );
              })}

              <AddDeviceButton dinId={id} />
            </div>
          );
        })}

        <button
          className="add_din_btn"
          onClick={() => {
            dispatch(addRow());
          }}
        >
          Add DIN
        </button>

        {/* <div className="devices__din" id="1">
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
                dinId={2}
              />
            );
          })}

          <AddDeviceButton />
        </div> */}
      </div>
    </div>
  );
}
