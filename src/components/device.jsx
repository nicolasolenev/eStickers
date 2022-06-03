import React, { useEffect } from 'react';
import Module from './module';
import Ruler from './ruler';
import { getDeviceTotalWidth } from '../functions';
import { useSelector, useDispatch } from 'react-redux';
import { updateSelected } from '../store/settingsSlice';
import {
  toggleDeviceNormallyOn,
  selectDevice,
  updateDeviceText,
} from '../store/devicesSlice';

export default function Device(props) {
  const { device, id } = props;
  const dispatch = useDispatch();

  function singleDeviceClickHandler(e) {
    dispatch(updateSelected({ deviceId: device.id }));
    if (e.shiftKey) {
      dispatch(selectDevice({ id: device.id }));
    }
  }

  function deviceInputHandler(e, key) {
    dispatch(
      updateDeviceText({
        id: device.id,
        text: e.target.value,
        key: key,
      })
    );
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
          onChange={(e) => deviceInputHandler(e, 'group')}
        ></input>
      </div>

      <div className="single-module__point">
        <span
          onClick={() => dispatch(toggleDeviceNormallyOn({ id: device.id }))}
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
          onChange={(e) => deviceInputHandler(e, 'switch')}
        ></input>
      </div>

      <div className="single-module__caption">
        <textarea
          rows={3}
          className="single-module__caption-input"
          placeholder={device.description}
          onChange={(e) => deviceInputHandler(e, 'description')}
        ></textarea>
      </div>

      <div className="single-module__phases">
        {device.modules.map((module, index) => (
          <Module
            key={module.id}
            id={id + index}
            module={module}
            deviceId={device.id}
          />
        ))}
      </div>

      <div className="rulers">
        {device.modules.map((module) => (
          <Ruler key={module.id} deviceId={device.id} moduleId={module.id} />
        ))}
      </div>
    </div>
  );
}
