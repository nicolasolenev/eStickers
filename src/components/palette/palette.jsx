import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';

import { themes } from '../../vars';

import {
  paletteType,
  paletteChecked,
  changeTheme,
} from '../../store/settingsSlice';
import { changeColor, applyTheme } from '../../store/devicesSlice';
import { PaletteCheckboxes } from './paletteCheckboxes';

const options = themes;

export default function Palette() {
  const dispatch = useDispatch();
  const [color, setColor] = useColor('hex', '#000000ff');
  const settings = useSelector((state) => state.settings);
  const defaultValueIndex = options
    .map((theme) => theme.value)
    .indexOf(settings.palette.theme);

  const defaultValue =
    defaultValueIndex !== -1 ? options[defaultValueIndex] : null;

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
        <div style={{ margin: '5px' }}>Изменение цвета выделенных групп</div>
        <div className="palette__radiobuttons">
          <label className="palette__radiobutton" htmlFor="text">
            <input
              type="radio"
              id="text"
              name="color"
              value="groupColor"
              checked={settings.palette.type === 'groupColor'}
              onChange={onTypeChanged}
            />
            Текст
          </label>
          <label className="palette__radiobutton" htmlFor="background">
            <input
              type="radio"
              id="background"
              name="color"
              value="groupBackground"
              checked={settings.palette.type === 'groupBackground'}
              onChange={onTypeChanged}
            />
            Фон
          </label>
        </div>
        {/* <PaletteCheckboxes /> */}
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
              })
            );
          }}
          hideHSV
          dark
        />
      </div>

      <div className="palette__settings">
        <div className="theme">
          Тема:
          <Select
            // defaultValue={defaultValue}
            value={defaultValue}
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
