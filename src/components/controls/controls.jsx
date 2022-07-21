import React from 'react';

import ProjectControls from './projectControls';
import FileControls from './fileControls';
import ViewControls from './viewControls';
import EditControls from './editControls';
import PrintControls from './printControls';

export default function Controls({ devicesRef }) {
  return (
    <div className="controls">
      <ProjectControls />
      <FileControls />
      <ViewControls />
      <EditControls />
      <PrintControls devicesRef={devicesRef} />
    </div>
  );
}
