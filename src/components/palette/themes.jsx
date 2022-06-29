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
              if (theme.value === 'random-gradient') {
                const colors = getRandomGradientColors(devices.groups.length);
                dispatch(applyRandomColors({ colors }));
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
              if (theme.value === 'random-gradient') {
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
      <div className="random-colors">
        Случайные цвета для групп с несколькими аппаратами (светлый фон):
        <button
          className="random-colors-btn"
          onClick={() => {
            const colors = generateCoupleColors(devices.groups.length);

            dispatch(applyRandomColors({ colors }));
            dispatch(setPaletteValue({ theme: '' }));
          }}
        />
        Случайные цвета для групп с несколькими аппаратами (темный фон):
        <button
          style={{ padding: '2px 10px', margin: '5px 0 0 0' }}
          className="button"
          onClick={() => {
            const colors = generateCoupleColors(devices.groups.length);

            dispatch(applyRandomColors({ colors, inversion: true }));
            dispatch(setPaletteValue({ theme: '' }));
          }}
        >
          Click
        </button>
      </div>
    </div>
  );
}
