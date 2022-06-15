import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setPaletteValue } from '../../store/settingsSlice';
import { changeColor } from '../../store/devicesSlice';
import THEME from '../../theme';
import { getUsersColors } from '../../functions';
import Radiobuttons from './radiobuttons';

const defaultColors = THEME.getDefaultColors();

function getColors(defaultColors, usersColors) {
  const colors = new Set([...defaultColors]);
  usersColors.forEach((color) => colors.add(color));
  return [...colors];
}

export default function Buttons() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const usersColors = getUsersColors(settings.usersTheme);

  const colors = getColors(defaultColors, usersColors);

  return (
    <div className="palette__settings palette__settings_first-col">
      <div className="palette__title">Изменение цвета выделенных групп:</div>
      <Radiobuttons />
      <div
        className="palette__colors"
        onClick={(e) => {
          e.stopPropagation();

          const newColor = e.target.id;

          const isNewColor = e.target.className === 'palette__color';

          if (isNewColor) {
            dispatch(setPaletteValue({ theme: '' }));
            dispatch(
              changeColor({
                selected: settings.selected,
                color: newColor,
                type: settings.palette.type,
              })
            );
          }
        }}
      >
        {colors.map((color, id) => (
          <div
            key={id}
            id={color}
            className="palette__color"
            style={{ background: `${color}` }}
          ></div>
        ))}
      </div>
      <div className="palette__border-colors">
        <div className="palette__title">Цвет рамок:</div>
        <div className="palette__colors">
          <div
            className="palette__color"
            style={{ background: `#000` }}
            onClick={() => {
              dispatch(setPaletteValue({ borderColor: 'black' }));
            }}
          ></div>
          <div
            className="palette__color"
            style={{ background: `#fff` }}
            onClick={() => {
              dispatch(setPaletteValue({ borderColor: 'white' }));
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
