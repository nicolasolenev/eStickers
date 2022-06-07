import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';

import {
  paletteType,
  paletteChecked,
  changeTheme,
} from '../store/settingsSlice';
import { changeColor } from '../store/devicesSlice';

const options = [
  { value: 'gray', label: 'Gray' },
  { value: 'negray', label: 'Negray' },
];

export default function Palette() {
  const [color, setColor] = useColor('hex', '#f2f2f2');
  const settings = useSelector((state) => state.settings);
  const selectedOption = settings.palette.theme;
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      changeColor({
        selected: settings.selected,
        color: color.hex,
        type: settings.palette.type,
        fields: settings.palette.checked,
      })
    );
  }, [
    color.hex,
    dispatch,
    settings.palette.checked,
    settings.palette.type,
    settings.selected,
  ]);

  function onTypeChanged(e) {
    dispatch(paletteType(e.currentTarget.value));
  }

  return (
    <div className="palette">
      <div className="palette__settings">
        <div>
          <label htmlFor="text">
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
          <label htmlFor="background">
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

        <div>
          <label htmlFor="warning">
            <input
              type="checkbox"
              id="warning"
              name="warning"
              defaultChecked={settings.palette.checked.warning}
              onChange={() => dispatch(paletteChecked('warning'))}
            />
            Warning
          </label>

          <label htmlFor="switch">
            <input
              type="checkbox"
              id="switch"
              name="switch"
              defaultChecked={settings.palette.checked.switch}
              onChange={() => dispatch(paletteChecked('switch'))}
            />
            Switch
          </label>
        </div>
      </div>

      <div className="palette__settings">
        <ColorPicker
          width={256}
          height={128}
          color={color}
          alpha={true}
          hideRGB={true}
          onChange={setColor}
          hideHSV
          dark
        />
      </div>

      <div className="palette__settings">
        <div className="theme">
          Theme:
          {/* <select name="theme-select" id="theme-select">
            <option value="gray">gray</option>
            <option value="gray">negray</option>
          </select> */}
          <Select
            // value={selectedOption}
            options={options}
            onChange={(theme) => dispatch(changeTheme(theme.value))}
            isSearchable={false}
          />
        </div>
      </div>
    </div>
  );
}
