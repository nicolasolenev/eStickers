import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleWarning } from '../../store/devicesSlice';

export default function DeviceHoverBtns({ device }) {
  const dispatch = useDispatch();

  return (
    <div className="device__hover-btns">
      <button
        className="device__hover-btns-btn"
        onClick={() => dispatch(toggleWarning(device.id))}
      >
        {device.warning.isActive ? 'x warn' : 'add warn'}
      </button>
    </div>
  );
}
