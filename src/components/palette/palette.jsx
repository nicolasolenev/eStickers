import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';

import { setPaletteValue } from '../../store/settingsSlice';
import { changeColor } from '../../store/devicesSlice';
import Buttons from './buttons';
import Themes from './themes';

export default function Palette() {
  const dispatch = useDispatch();
  const [color, setColor] = useColor('hex', '#000000ff');
  const settings = useSelector((state) => state.settings);

  return (
    <div className="palette">
      <Buttons />

      <div className="palette__settings">
        <ColorPicker
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
                selected: settings.selected,
                color: col.hex,
                type: settings.palette.type,
              })
            );
          }}
          hideHSV
        />
      </div>

      <Themes />
    </div>
  );
}
