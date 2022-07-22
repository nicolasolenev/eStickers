import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChromePicker } from 'react-color';

import { setPaletteValue } from '../../store/settingsSlice';
import { changeColor } from '../../store/devicesSlice';
import Buttons from './buttons';
import Themes from './themes';

export default function Palette() {
  const dispatch = useDispatch();
  const [color, setColor] = useState({ h: 200, s: 0.8, l: 0.53 });
  const [isOpen, setOpen] = useState(false);
  const settings = useSelector((state) => state.settings);

  const handleChange = (color) => {
    setColor(color.hsl);
    dispatch(setPaletteValue({ theme: '' }));
    dispatch(
      changeColor({
        color: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
        type: settings.palette.type,
      })
    );
  };

  return (
    <div className="palette">
      <Buttons setColor={setColor} />

      <button
        className="palette__colorpicker-button"
        onClick={() => setOpen(!isOpen)}
      >
        Color Picker
      </button>

      <div
        className="palette__settings palette__settings-picker"
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        <ChromePicker
          color={color}
          onChange={(color) => {
            handleChange(color);
          }}
        />
      </div>

      <Themes />
    </div>
  );
}
