import React from 'react';
import { useDispatch } from 'react-redux';

import { setLocalization } from '../store/settingsSlice';

export default function Localization() {
  const dispatch = useDispatch();

  return (
    <div className="localization">
      <button
        className="localization__button"
        onClick={() => dispatch(setLocalization())}
      >
        ru/en
      </button>
    </div>
  );
}
