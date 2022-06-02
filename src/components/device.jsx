import React, { useEffect } from 'react';
import Module from './module';
import Ruler from './ruler';
import { getDeviceTotalWidth } from '../functions';
import { useSelector, useDispatch } from 'react-redux';
import { updateSelected } from '../store/settingsSlice';

export default function Device(props) {
  const { device, devices, setDevices, id, deviceId } = props;
  const dispatch = useDispatch();

  function singleDeviceClickHandler(e) {
    dispatch(updateSelected({ deviceId }));
    if (e.shiftKey) {
      e.target.closest('.single-module').classList.toggle('test');
    }
  }

  return (
    <div
      className="single-module"
      style={{ width: `${getDeviceTotalWidth(device)}mm` }}
      onClick={singleDeviceClickHandler}
    >
      <div className="single-module__where">
        <input
          className="single-module__where-input"
          placeholder={device.group}
        ></input>
      </div>

      <div className="single-module__point">
        <span
          onClick={() =>
            setDevices(
              [...devices].map((device) => {
                if (deviceId === device.id) {
                  device.normallyOn = !device.normallyOn;
                }
                return device;
              })
            )
          }
          className={
            !device.normallyOn
              ? 'point-circle'
              : 'point-circle point-circle_active'
          }
        ></span>
      </div>

      <div className="single-module__designation">
        <input
          className="single-module__designation-input"
          placeholder={device.switch}
        ></input>
      </div>

      <div className="single-module__caption">
        <textarea
          rows={3}
          className="single-module__caption-input"
          placeholder={device.description}
        ></textarea>
      </div>

      <div className="single-module__phases">
        {device.modules.map((module, index) => (
          <Module module={module} id={id + index} key={module.id} />
        ))}
      </div>

      <div className="rulers">
        {device.modules.map((module) => (
          <Ruler
            key={module.id}
            moduleId={module.id}
            width={module.width}
            setWidth={setDevices}
            devices={devices}
            deviceId={deviceId}
          />
        ))}
      </div>
    </div>
  );
}
