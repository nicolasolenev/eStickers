import './App.scss';
import React from 'react';

import Devices from './components/devices';
import Buttons from './components/buttons';
import Palette from './components/palette';

function App() {
  return (
    <>
      <div className="wrapper">
        <Buttons />
        <Devices />
      </div>
      <Palette />
    </>
  );
}

export default App;
