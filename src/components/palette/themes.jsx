import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';

import { themes } from '../../vars';
import { getUsersTheme } from '../../functions';
import { setPaletteValue, setUsersTheme } from '../../store/settingsSlice';
import { applyTheme, applyUsersTheme } from '../../store/devicesSlice';

export default function Themes() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const devices = useSelector((state) => state.devices);

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

            if (settings.palette.theme === '' && theme.value !== '') {
              const usersTheme = getUsersTheme(devices.groups);
              dispatch(setUsersTheme({ usersTheme }));
              dispatch(applyTheme({ themeName: theme.value }));
            } else if (theme.value === '') {
              if (Object.entries(settings.usersTheme).length !== 0) {
                dispatch(applyUsersTheme({ theme: settings.usersTheme }));
              }
            } else {
              dispatch(applyTheme({ themeName: theme.value }));
            }
          }}
          isSearchable={false}
        />
      </div>
    </div>
  );
}
