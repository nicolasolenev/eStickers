import './App.scss';
import React from 'react';

import Devices from './components/devices';
import Buttons from './components/buttons';
import Palette from './components/palette/palette';
import Header from './components/header';

export default function App() {
  return (
    <>
      <Header />
      <DevicesRow />
      <Palette />
    </>
  );
}

function DevicesRow(props) {
  return (
    <div className="wrapper">
      <Buttons />
      <Devices />
    </div>
  );
}
