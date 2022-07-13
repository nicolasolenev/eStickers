import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChromePicker, HuePicker, AlphaPicker } from 'react-color';

import { setPaletteValue } from '../../store/settingsSlice';
import { changeColor } from '../../store/devicesSlice';
import Buttons from './buttons';
import Themes from './themes';

export default function Palette() {
  const dispatch = useDispatch();
  const [color, setColor] = useState({ h: 200, s: 0.8, l: 0.53 });
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

      <div className="palette__settings palette__settings-picker">
        {/* <ChromePicker
          color={color}
          onChange={(color) => {
            handleChange(color);
          }}
        /> */}
        <HuePicker
          color={color}
          onChange={(color) => {
            handleChange(color);
          }}
        />
        <AlphaPicker
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
