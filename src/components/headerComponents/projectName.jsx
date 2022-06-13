import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setProjectName } from '../../store/settingsSlice';

export default function ProjectName() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  return (
    <div>
      Название документа:
      <input
        type="text"
        value={settings.projectName}
        onChange={(e) => dispatch(setProjectName(e.target.value))}
      />
    </div>
  );
}
