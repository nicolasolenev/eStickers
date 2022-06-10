import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleVisability } from '../store/settingsSlice';

export function ButtonCaption() {
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  return (
    <div className="switch-button">
      <input
        className="switch-button-checkbox"
        type="checkbox"
        checked={settings.sequence}
        onChange={() => dispatch(toggleVisability('sequence'))}
      />
      <label className="switch-button-label" htmlFor="">
        <span className="switch-button-label-span">Надписи</span>
      </label>
    </div>
  );
}
