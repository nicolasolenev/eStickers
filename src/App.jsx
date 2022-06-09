import './App.scss';
import React from 'react';

import Devices from './components/devices';
import Buttons from './components/buttons';
import Palette from './components/palette/palette';

function App() {
  return (
    <>
      <div className="app-helpers">
        <p>Управление/горячие клавиши:</p>
        <ul>
          <li>Выделить модуль: Alt + ЛКМ по модулю</li>
          <li>Удалить выделенные модули: Alt + Delete</li>
        </ul>
      </div>
      <div className="wrapper">
        <Buttons />
        <Devices />
      </div>
      <Palette />
    </>
  );
}

export default App;
