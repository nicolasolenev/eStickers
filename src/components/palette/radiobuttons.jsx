import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setPaletteValue } from '../../store/settingsSlice';

export default function Radiobuttons() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  function onTypeChanged(e) {
    dispatch(setPaletteValue({ type: e.currentTarget.value }));
  }

  return (
    <div className="palette__radiobuttons">
      <label className="palette__radiobutton" htmlFor="background">
        <input
          type="radio"
          id="background"
          value="backgroundColor"
          checked={settings.palette.type === 'backgroundColor'}
          onChange={onTypeChanged}
        />
        Фон
      </label>

      <label className="palette__radiobutton" htmlFor="text">
        <input
          type="radio"
          id="text"
          value="textColor"
          checked={settings.palette.type === 'textColor'}
          onChange={onTypeChanged}
        />
        Текст
      </label>
    </div>
  );
}
