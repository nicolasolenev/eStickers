import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toggleVisability } from '../../store/settingsSlice';

export default function ButtonCaption() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  return (
    <div className="switch-button">
      <input
        className="switch-button-checkbox"
        type="checkbox"
        checked={settings.display.sequence}
        onChange={() => dispatch(toggleVisability('sequence'))}
      />

      <label className="switch-button-label">
        <span className="switch-button-label-span">Надписи</span>
      </label>
    </div>
  );
}
