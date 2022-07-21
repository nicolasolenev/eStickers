import React from 'react';
import { useDispatch } from 'react-redux';

import { setPaperWidth } from '../store/settingsSlice';

export function PaperFormatButotns({ setWidth }) {
  const dispatch = useDispatch();

  function buttonHandler(width) {
    setWidth(width);
    dispatch(setPaperWidth(width));
  }

  return (
    <div className="paper-format__buttons">
      Формат:
      <button
        className="paper-format__button"
        onClick={() => buttonHandler(297)}
      >
        A4
      </button>
      <button
        className="paper-format__button"
        onClick={() => buttonHandler(420)}
      >
        A3
      </button>
    </div>
  );
}
