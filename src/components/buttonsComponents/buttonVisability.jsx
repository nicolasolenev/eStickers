import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toggleVisability } from '../../store/settingsSlice';

export default function ButtonVisability({ fieldName, text }) {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  return (
    <label className="palette__checkbox" htmlFor={fieldName}>
      <input
        className="palette__checkbox-input"
        type="checkbox"
        id={fieldName}
        name={fieldName}
        checked={settings.display[fieldName]}
        onChange={() => dispatch(toggleVisability(fieldName))}
      />

      {text}
    </label>
  );
}
