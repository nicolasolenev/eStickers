import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setPaletteValue } from '../../store/settingsSlice';
import { changeColor } from '../../store/devicesSlice';
import { defaultColors, defaultWarningColors } from '../../theme';
import Radiobuttons from './radiobuttons';

export default function Buttons() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const devices = useSelector((state) => state.devices);

  const selectedColors = () => {
    const colors = devices.selected.map((item) => {
      return settings.palette.type === 'backgroundColor'
        ? item.backgroundColor
        : item.textColor;
    });
    const uniqColors = new Set([...colors]);

    return [...uniqColors];
  };

  return (
    <div className="palette__settings palette__settings_first-col">
      {/* <div className="palette__title">Изменение цвета выделенных групп:</div> */}
      <Radiobuttons />
      <div
        className="palette__colors"
        onClick={(e) => {
          e.stopPropagation();

          const newColor = e.target.id;

          const isNewColor = e.target.className === 'palette__color';

          if (isNewColor) {
            if (settings.palette.theme !== '') {
              dispatch(setPaletteValue({ theme: '' }));
            }
            dispatch(
              changeColor({
                color: newColor,
                type: settings.palette.type,
              })
            );
          }
        }}
      >
        {defaultColors.map((color, id) => (
          <div
            key={id}
            id={color}
            className="palette__color"
            style={{ background: `${color}` }}
          ></div>
        ))}
      </div>

      {/* <div className="palette__title">Цвета выделенных аппаратов:</div> */}
      <div className="palette__selected-colors">
        {selectedColors().map((color, id) => (
          <div
            key={id + color}
            id={color}
            className="palette__color"
            style={{ background: `${color}` }}
          ></div>
        ))}
      </div>

      <div className="palette__title">Примечания выделенных аппаратов:</div>
      <div className="palette__colors">
        {defaultWarningColors.map((item, i) => (
          <div
            className="palette__color"
            key={i}
            onClick={() =>
              dispatch(changeColor({ color: item, isWarningColor: true }))
            }
          >
            <div
              className="palette__color_warning"
              style={{ background: `${item[0]}` }}
            ></div>
            <div
              className="palette__color_warning"
              style={{ background: `${item[1]}` }}
            ></div>
          </div>
        ))}
      </div>

      <div className="palette__border-colors">
        <div className="palette__title palette__border-colors_title">
          Цвет рамок:
        </div>
        <div className="palette__colors palette__border-colors_colors">
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
