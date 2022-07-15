import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';

import { themes } from '../../vars';
import {
  getUsersTheme,
  generateCoupleColors,
  getRandomGradientColors,
} from '../../functions';
import { setPaletteValue, setUsersTheme } from '../../store/settingsSlice';
import {
  applyTheme,
  applyUsersTheme,
  applyRandomColors,
} from '../../store/devicesSlice';

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    marginTop: '2px',
  }),

  indicatorsContainer: (provided, state) => ({
    height: '25px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
  }),

  control: (provided) => ({
    ...provided,
    minHeight: '25x',
  }),
};

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
          styles={customStyles}
          value={defaultValue}
          options={themes}
          onChange={(theme) => {
            dispatch(setPaletteValue({ theme: theme.value }));

            if (settings.palette.theme === '' && theme.value !== '') {
              if (
                ['random-gradient', 'random-light', 'random-dark'].includes(
                  theme.value
                )
              ) {
                const colors =
                  theme.value === 'random-gradient'
                    ? getRandomGradientColors(devices.groups.length)
                    : generateCoupleColors(devices.groups.length);

                dispatch(
                  applyRandomColors({
                    colors,
                    inversion: theme.value === 'random-dark',
                  })
                );
                dispatch(setPaletteValue({ theme: '' }));
              } else {
                const usersTheme = getUsersTheme(devices.groups);
                dispatch(setUsersTheme({ usersTheme }));
                dispatch(applyTheme({ themeName: theme.value }));
              }
            } else if (theme.value === '') {
              if (Object.entries(settings.usersTheme).length !== 0) {
                dispatch(applyUsersTheme({ theme: settings.usersTheme }));
              }
            } else {
              if (
                ['random-gradient', 'random-light', 'random-dark'].includes(
                  theme.value
                )
              ) {
                const colors = getRandomGradientColors(devices.groups.length);
                dispatch(applyRandomColors({ colors }));
                dispatch(setPaletteValue({ theme: '' }));
              } else {
                dispatch(applyTheme({ themeName: theme.value }));
              }
            }
          }}
          isSearchable={false}
        />
      </div>
    </div>
  );
}
