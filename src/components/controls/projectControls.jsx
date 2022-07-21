import React from 'react';
import { useSelector } from 'react-redux';

import ControlLayout from './controlLayout';
import ProjectName from './projectName';
import StartNewProject from './startNewProject';
import localization from '../../localization';

export default function ProjectControls() {
  const settings = useSelector((state) => state.settings);
  const lang = settings.localization;

  return (
    <ControlLayout
      name={localization.controls.project.title[lang]}
      className="buttons-container-document"
    >
      <ProjectName />
      <StartNewProject />
    </ControlLayout>
  );
}
