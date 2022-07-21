import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setProjectName } from '../../store/settingsSlice';
import localization from '../../localization';

export default function ProjectName() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const lang = settings.localization;
  const [value, setValue] = useState(settings.projectName);

  useEffect(() => {
    setValue(settings.projectName);
  }, [settings.projectName]);

  return (
    <>
      {localization.controls.project.inputLabel[lang]}:
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
