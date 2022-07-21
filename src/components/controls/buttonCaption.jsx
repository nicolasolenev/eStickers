import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toggleVisability } from '../../store/settingsSlice';
import localization from '../../localization';

export default function ButtonCaption() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const lang = settings.localization;

  return (
    <div className={`switch-button switch-button-${lang}`}>
      <input
        className="switch-button-checkbox"
        type="checkbox"
        checked={settings.display.sequence}
        onChange={() => dispatch(toggleVisability('sequence'))}
      />

      <label className="switch-button-label">
        <span className="switch-button-label-span">
          {localization.controls.view.buttonCaption[lang]}
        </span>
      </label>
    </div>
  );
}
