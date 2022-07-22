import React from 'react';

import ControlLayout from './controlLayout';
import ProjectName from './projectName';
import StartNewProject from './startNewProject';

export default function ProjectControls() {
  return (
    <ControlLayout name="Проект" className="buttons-container-document">
      <ProjectName />
      <StartNewProject />
    </ControlLayout>
  );
}
