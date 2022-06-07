import React, { Fragment, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { classes, getDeviceTotalWidth } from '../functions';

function getHeight(el) {
  console.log(el);
  return el.current.clientHeight;
}

export default function Print() {
  const settings = useSelector((state) => state.settings);
  const devices = useSelector((state) => state.devices);
  let count = 1;
  const devRef = useRef();

  useEffect(() => {
    // window.print();
    console.log(devRef);
  }, []);

  return (
    <div className="print">
      <div
        className={classes('devices', {
          description: settings.sequence,
          numeration: settings.numeration,
          modulesName: settings.modulesName,
          groups: settings.groups,
        })}
      >
        {Object.values(devices).map((device) => {
          const id = count;
          count = count + device.modules.length;
          const deviceId = device.id;
          return (
            <Fragment key={id}>
              <div
                ref={devRef}
                className={device.selected ? 'device selected' : 'device'}
                style={{
                  width: `${getDeviceTotalWidth(device)}mm`,
                  background: `${device.background}`,
                }}
              >
                {device.warning.text && (
                  <div
                    className="device__warning"
                    style={
                      {
                        // bottom: `calc(${getHeight(devRef)}px + 1px)`,
                      }
                    }
                  >
                    {device.warning.text}
                    {/* additionalClasses={['device__warning-text']} */}
                  </div>
                )}

                <div className="device__group">{device.group.text}</div>

                <div className="device__point">
                  <span
                    className={
                      !device.normallyOn
                        ? 'point-circle'
                        : 'point-circle point-circle_active'
                    }
                  ></span>
                </div>

                <div className="device__switch">{device.switch.text}</div>

                <div className="device__description">
                  {device.description.text}
                </div>

                <div className="device__modules">
                  {device.modules.map((module, index) => (
                    /* <Module
                      key={module.id}
                      id={id + index}
                      module={module}
                      deviceId={deviceId}
                    /> */
                    <Fragment key={module.id}>
                      <div
                        className="device__module"
                        style={{
                          width: `${module.width < 8 ? 8 : module.width}mm`,
                        }}
                      >
                        {module.moduleName}
                        <div className="device__id">{id}</div>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
