import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setPaperWidth } from '../store/settingsSlice';
import { PaperFormatButotns } from './paperFormatButtons';

export default function PaperFormat() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const [width, setWidth] = useState(settings.paperWidth);

  return (
    <div className="paper-format">
      <div className="paper-format__field">
        Ширина листа:
        <input
          className="paper-format__input"
          type="number"
          value={width}
          onChange={(e) => {
            setWidth(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.code === 'KeyE') {
              e.preventDefault();
            }
            if (
              (e.code === 'Enter' || e.code === 'NumpadEnter') &&
              settings.paperWidth !== width
            ) {
              dispatch(setPaperWidth(width));
            }
          }}
        />{' '}
        мм
      </div>

      <PaperFormatButotns setWidth={setWidth} />
    </div>
  );
}
