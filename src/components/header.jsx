import React from 'react';

import PaperFormat from './headerComponents/paperFormat';
import Helpers from './headerComponents/helpers';
import ProjectName from './headerComponents/projectName';

export default function Header() {
  return (
    <header className="header">
      <Helpers />
      <ProjectName />
      <button className="button">Начать новый проект</button>
      <PaperFormat />
    </header>
  );
}
