import React, { useEffect } from 'react';
import Module from './module';
import Ruler from './ruler';
import { getDeviceTotalWidth } from '../functions';
import { useSelector, useDispatch } from 'react-redux';
import { updateSelected } from '../store/settingsSlice';
import {
  updateDevice,
  selectDevice,
  setNormallyOn,
} from '../store/devicesSlice';

export default function Device(props) {
  const { device, devices, setDevices, id, deviceId } = props;
  const dispatch = useDispatch();

  function singleDeviceClickHandler(e) {
    dispatch(updateSelected({ deviceId }));
    if (e.shiftKey) {
      dispatch(selectDevice({ id: deviceId }));
    }
  }

  return (
    <div
      className={device.selected ? 'single-module test' : 'single-module'}
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
          onClick={() => dispatch(updateDevice({ id: deviceId }))}
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
