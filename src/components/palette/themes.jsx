import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';

import { themes } from '../../vars';
import { setPaletteValue } from '../../store/settingsSlice';
import { applyTheme } from '../../store/devicesSlice';

export default function Themes() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  const defaultValueIndex = themes
    .map((theme) => theme.value)
    .indexOf(settings.palette.theme);

  const defaultValue =
    defaultValueIndex !== -1 ? themes[defaultValueIndex] : null;

  return (
    <div className="palette__settings">
      <div className="theme">
        Тема:
        <Select
          value={defaultValue}
          options={themes}
          onChange={(theme) => {
            dispatch(setPaletteValue({ theme: theme.value }));
            dispatch(applyTheme({ themeName: theme.value }));
          }}
          isSearchable={false}
        />
      </div>
    </div>
  );
}
