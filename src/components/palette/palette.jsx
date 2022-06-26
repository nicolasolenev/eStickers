import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { ColorPicker, useColor } from 'react-color-palette';
import { ChromePicker } from 'react-color';
import 'react-color-palette/lib/css/styles.css';

import { setPaletteValue } from '../../store/settingsSlice';
import { changeColor } from '../../store/devicesSlice';
import Buttons from './buttons';
import Themes from './themes';

export default function Palette() {
  const dispatch = useDispatch();
  // const [color, setColor] = useColor('hex', '#000000ff');
  const [color, setColor] = useState({ h: 200, s: 0.8, l: 0.53 });
  const settings = useSelector((state) => state.settings);

  const handleChange = (color) => {
    setColor(color.hsl);
    dispatch(setPaletteValue({ theme: '' }));
    dispatch(
      changeColor({
        color: color.hex,
        type: settings.palette.type,
      })
    );
  };

  return (
    <div className="palette">
      <Buttons />

      <div className="palette__settings">
        {/* <ColorPicker
          width={256}
          height={128}
          color={color}
          alpha={true}
          hideRGB={true}
          onChange={(col) => {
            setColor(col);
            dispatch(setPaletteValue({ theme: '' }));
            dispatch(
              changeColor({
                color: col.hex,
                type: settings.palette.type,
              })
            );
          }}
          hideHSV
        /> */}
        <ChromePicker
          color={color}
          onChange={(color) => {
            handleChange(color);
            console.log('color');
          }}
        />
      </div>

      <Themes />
    </div>
  );
}
