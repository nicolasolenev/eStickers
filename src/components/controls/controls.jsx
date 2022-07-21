import React from 'react';

import ProjectControls from './projectControls';
import FileControls from './fileControls';
import ViewControls from './viewControls';
import EditControls from './editControls';
import PrintControls from './printControls';
import Localization from '../localization';

export default function Controls({ devicesRef }) {
  return (
    <div className="controls">
      <Localization />
      <ProjectControls />
      <FileControls />
      <ViewControls />
      <EditControls />
      <PrintControls devicesRef={devicesRef} />
    </div>
  );
}
