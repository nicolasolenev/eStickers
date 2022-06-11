import React, { Fragment, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  getClasses,
  getDeviceTotalWidth,
  getMaxInputHeight,
} from '../functions';
import { clearSelected } from '../store/settingsSlice';

function getHeight(el) {
  console.log(el);
  return el.current.clientHeight;
}

export default function Print() {
  const settings = useSelector((state) => state.settings);
  const devices = useSelector((state) => state.devices);
  let count = 1;
  const dispatch = useDispatch();
  const devRef = useRef();

  useEffect(() => {
    // window.print();
    dispatch(clearSelected());
  }, []);

  return (
    <div className="print">
      <div
        className={getClasses('devices', {
          description: settings.sequence,
          numeration: settings.numeration,
          modulesName: settings.modulesName,
          groups: settings.groups,
          switches: settings.switches,
          descriptions: settings.descriptions,
          points: settings.points,
        })}
      >
        {Object.values(devices).map((device) => {
          const id = count;
          count = count + device.modules.value.length;
          const deviceId = device.id;
          return (
            <Fragment key={id}>
              <div
                ref={devRef}
                className={device.selected ? 'device selected' : 'device'}
                style={{
                  width: `${getDeviceTotalWidth(device)}mm`,
                }}
              >
                {device.warning.text && (
                  <div
                    className="device__warning"
                    style={{ background: `${device.warning.backgroundColor}` }}
                  >
                    {device.warning.text}
                    {/* additionalClasses={['device__warning-text']} */}
                  </div>
                )}

                <div
                  className="device__group"
                  style={{ background: `${device.group.backgroundColor}` }}
                >
                  <div className="device__group-input">{device.group.text}</div>
                </div>

                <div
                  className="device__point"
                  style={{ background: `${device.normallyOn.backgroundColor}` }}
                >
                  <span
                    className={
                      !device.normallyOn.value
                        ? 'point-circle'
                        : 'point-circle point-circle_active'
                    }
                  ></span>
                </div>

                <div
                  className="device__switch"
                  style={{ background: `${device.switch.backgroundColor}` }}
                >
                  <div className="device__switch-input">
                    {device.switch.text}
                  </div>
                </div>

                <div
                  className="device__description"
                  style={{
                    background: `${device.description.backgroundColor}`,
                    height: `${
                      getMaxInputHeight(devices, 'description') + 17
                    }px`,
                  }}
                >
                  {device.description.text}
                </div>

                <div
                  className="device__modules"
                  style={{ background: `${device.modules.backgroundColor}` }}
                >
                  {device.modules.value.map((module, index) => (
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
                        <div className="device__module-input">
                          {module.moduleName}
                        </div>
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
