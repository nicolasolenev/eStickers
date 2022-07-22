import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setProjectName } from '../../store/settingsSlice';

export default function ProjectName() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const [value, setValue] = useState(settings.projectName);

  useEffect(() => {
    setValue(settings.projectName);
  }, [settings.projectName]);

  return (
    <>
      Название проекта:
      <input
        type="text"
        className="project-name-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => {
          dispatch(setProjectName(value));
        }}
      />
    </>
  );
}
