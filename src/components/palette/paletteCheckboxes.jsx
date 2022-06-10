import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { paletteChecked } from '../../store/settingsSlice';

export function PaletteCheckboxes(props) {
  return (
    <div className="palette__checkboxes">
      <PaletteCheckbox name="warning" text="Примечание" />
      <PaletteCheckbox name="group" text="Группа" />
      <PaletteCheckbox name="normallyOn" text="Норм. положение" />
      <PaletteCheckbox name="switch" text="Обознач. на схеме" />
      <PaletteCheckbox name="description" text="Название" />
      <PaletteCheckbox name="modules" text="Полюса" />
    </div>
  );
}

function PaletteCheckbox({ name, text }) {
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
      {text}
    </label>
  );
}
