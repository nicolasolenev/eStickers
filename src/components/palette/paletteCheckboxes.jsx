import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { paletteChecked } from '../../store/settingsSlice';

export function PaletteCheckboxes(props) {
  return (
    <div className="palette__checkboxes">
      <PaletteCheckbox name="warning" />
      <PaletteCheckbox name="group" />
      <PaletteCheckbox name="normallyOn" />
      <PaletteCheckbox name="switch" />
      <PaletteCheckbox name="description" />
      <PaletteCheckbox name="modules" />
    </div>
  );
}

function PaletteCheckbox({ name }) {
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  return (
    <label className="palette__checkbox" htmlFor={name}>
      <input
        className="palette__checkbox-input"
        type="checkbox"
        id={name}
        name={name}
        defaultChecked={settings.palette.checked[name]}
        onChange={() => dispatch(paletteChecked(name))}
      />
      {name
        .split('')
        .map((l, i) => (i === 0 ? l.toUpperCase() : l))
        .join('')}
    </label>
  );
}
