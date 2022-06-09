import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleVisability } from '../store/settingsSlice';

export function ButtonVisability({ fieldName, text, isSequence }) {
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  // const textOn = isSequence ? 'Надписи' : `Скрыть ${text}`;
  // const textOff = isSequence ? 'Подписи' : `Показать ${text}`;

  return (
    // <button
    //   className="button"
    //   onClick={() => dispatch(toggleVisability(fieldName))}
    // >
    //   {settings[fieldName] ? textOn : textOff}
    // </button>

    <label className="palette__checkbox" htmlFor={fieldName}>
      <input
        className="palette__checkbox-input"
        type="checkbox"
        id={fieldName}
        name={fieldName}
        checked={settings[fieldName]}
        onChange={() => dispatch(toggleVisability(fieldName))}
      />
      {!isSequence ? text : settings[fieldName] ? `Над${text}` : `Под${text}`}
    </label>
  );
}
