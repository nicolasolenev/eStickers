import React from 'react';
import { useDispatch } from 'react-redux';
import { updateSelected } from '../store/settingsSlice';

import Module from './module';
import Ruler from './ruler';
import { getDeviceTotalWidth } from '../functions';
import {
  toggleDeviceNormallyOn,
  selectDevice,
  updateDeviceText,
} from '../store/devicesSlice';

export default function Device(props) {
  const { device, id } = props;
  const deviceId = device.id;
  const dispatch = useDispatch();

  function singleDeviceClickHandler(e) {
    if (e.shiftKey) {
      dispatch(selectDevice({ deviceId }));
      dispatch(updateSelected({ deviceId }));
    }
  }

  function deviceInputHandler(e, key) {
    dispatch(
      updateDeviceText({
        deviceId,
        text: e.target.value,
        key: key,
      })
    );
  }

  return (
    <div
      className={device.selected ? 'device selected' : 'device'}
      style={{ width: `${getDeviceTotalWidth(device)}mm` }}
      onClick={singleDeviceClickHandler}
    >
      <div className="device__group">
        <input
          className="device__group-input"
          placeholder="Где?"
          value={device.group}
          onChange={(e) => deviceInputHandler(e, 'group')}
        ></input>
      </div>

      <div className="device__point">
        <span
          onClick={() => dispatch(toggleDeviceNormallyOn({ deviceId }))}
          className={
            !device.normallyOn
              ? 'point-circle'
              : 'point-circle point-circle_active'
          }
        ></span>
      </div>

      <div className="device__switch">
        <input
          className="device__switch-input"
          placeholder="QF1"
          value={device.switch}
          onChange={(e) => deviceInputHandler(e, 'switch')}
        ></input>
      </div>

      <div className="device__description">
        <textarea
          rows={3}
          className="device__description-input"
          placeholder="Надпись, название линии"
          value={device.description}
          onChange={(e) => deviceInputHandler(e, 'description')}
        ></textarea>
      </div>

      <div className="device__modules">
        {device.modules.map((module, index) => (
          <Module
            key={module.id}
            id={id + index}
            module={module}
            deviceId={deviceId}
          />
        ))}
      </div>

      <div className="rulers">
        {device.modules.map((module) => (
          <Ruler key={module.id} deviceId={deviceId} moduleId={module.id} />
        ))}
      </div>
    </div>
  );
}
