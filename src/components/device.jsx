import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MultilineInput } from 'react-input-multiline';

import Module from './module';
import Ruler from './ruler';
import { updateSelected } from '../store/settingsSlice';
import { getDeviceTotalWidth } from '../functions';
import {
  toggleDeviceNormallyOn,
  selectDevice,
  updateDeviceText,
  deleteDevice,
} from '../store/devicesSlice';

function getHeight(el) {
  return el.current.clientHeight;
}

export default function Device(props) {
  const { device, id } = props;
  const deviceId = device.id;
  const [warning, setWarning] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const deviceRef = useRef();

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
      style={{
        width: `${getDeviceTotalWidth(device)}mm`,
        background: `${device.background}`,
      }}
      onClick={singleDeviceClickHandler}
      ref={deviceRef}
    >
      <div className="device__delete">
        {/* <button
          className="device__delete-btn"
          onClick={() => dispatch(deleteDevice({ deviceId }))}
        >
          x
        </button> */}

        <button className="device__delete-btn" onClick={() => setWarning(true)}>
          add warn
        </button>
      </div>

      {(device.warning.text || warning) && (
        <div
          className="device__warning"
          style={{
            bottom: `calc(${getHeight(deviceRef)}px + 1px)`,
          }}
        >
          <MultilineInput
            value={device.warning.text}
            onChange={(e) => {
              // setInputValue(e.target.value);
              deviceInputHandler(e, 'warning');
            }}
            additionalClasses={['device__warning-text']}
            placeholder="Warning"
          />
        </div>
      )}

      <div className="device__group">
        <input
          className="device__group-input"
          placeholder="Где?"
          value={device.group.text}
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
          value={device.switch.text}
          style={{
            color: `${device.switch.textColor}`,
          }}
          onChange={(e) => deviceInputHandler(e, 'switch')}
        ></input>
      </div>

      <div className="device__description">
        <textarea
          rows={3}
          className="device__description-input"
          placeholder="Надпись, название линии"
          value={device.description.text}
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
