import React from 'react';

import { PaperFormat } from './headerComponents/paperFormat';
import { Helpers } from './headerComponents/helpers';

export default function Header() {
  return (
    <header className="header">
      <Helpers />
      <PaperFormat />
    </header>
  );
}
