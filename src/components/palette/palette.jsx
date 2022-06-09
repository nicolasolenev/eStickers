import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';

import {
  paletteType,
  paletteChecked,
  changeTheme,
} from '../../store/settingsSlice';
import { changeColor, applyTheme } from '../../store/devicesSlice';
import { PaletteCheckboxes } from './paletteCheckboxes';

const options = [
  { value: 'gray', label: 'Gray' },
  { value: '8', label: 'Без групп, серая заливка' },
  // { value: '10', label: 'Цветная' },
];

export default function Palette() {
  const [color, setColor] = useColor('hex', '#b6d4c184');
  const settings = useSelector((state) => state.settings);
  const selectedOption = settings.palette.theme;
  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   dispatch(
  //     changeColor({
  //       selected: settings.selected,
  //       color: color.hex,
  //       type: settings.palette.type,
  //       fields: settings.palette.checked,
  //     })
  //   );
  // }, [
  //   color.hex,
  //   dispatch,
  //   settings.palette.checked,
  //   settings.palette.type,
  //   settings.selected,
  // ]);

  function onTypeChanged(e) {
    dispatch(paletteType(e.currentTarget.value));
  }

  return (
    <div className="palette">
      <div className="palette__settings palette__settings_first-col">
        <div style={{ margin: '5px' }}>Изменение цвета выделенных модулей</div>
        <div className="palette__radiobuttons">
          <label className="palette__radiobutton" htmlFor="text">
            <input
              type="radio"
              id="text"
              name="color"
              value="textColor"
              checked={settings.palette.type === 'textColor'}
              onChange={onTypeChanged}
            />
            Text
          </label>
          <label className="palette__radiobutton" htmlFor="background">
            <input
              type="radio"
              id="background"
              name="color"
              value="backgroundColor"
              checked={settings.palette.type === 'backgroundColor'}
              onChange={onTypeChanged}
            />
            Background
          </label>
        </div>
        <PaletteCheckboxes />
      </div>

      <div className="palette__settings">
        <ColorPicker
          width={256}
          height={128}
          color={color}
          alpha={true}
          hideRGB={true}
          onChange={(col) => {
            setColor(col);
            dispatch(
              changeColor({
                selected: settings.selected,
                color: color.hex,
                type: settings.palette.type,
                fields: settings.palette.checked,
              })
            );
          }}
          hideHSV
          dark
        />
      </div>

      <div className="palette__settings">
        <div className="theme">
          Theme:
          <Select
            // value={selectedOption}
            options={options}
            onChange={(theme) => {
              dispatch(changeTheme(theme.value));
              dispatch(applyTheme({ themeName: theme.value }));
            }}
            isSearchable={false}
          />
        </div>
      </div>
    </div>
  );
}
