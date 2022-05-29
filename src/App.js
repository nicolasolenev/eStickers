import './App.scss';
import Module from './components/singleModule';
import React, { useState } from 'react';
import EditMenu from './components/editMenu';

function App() {
  const [sequence, setSequence] = useState(false);
  const [modules, addModule] = useState([<Module id={1} key={1} />]);
  const [editMenuVisability, setEditMenuVisability] = useState(false);
  const [positionMenu, setPositionMenu] = useState([0, 10]);

  return (
    <>
      <div
        className={!sequence ? 'modules' : 'modules captions'}
        onClick={(e) => {
          if (
            e.target.closest('.single-module') &&
            !e.target.classList.contains('point-circle')
          ) {
            setEditMenuVisability(true);
            setPositionMenu([
              e.target.closest('.single-module').offsetTop +
                e.target.closest('.single-module').offsetHeight,
              e.target.closest('.single-module').offsetLeft,
            ]);
            console.log(e.target.closest('.single-module').offsetLeft);
          }
        }}
      >
        {modules}
        <div className="modules__add">
          <button
            className="modules__add-btn"
            onClick={() =>
              addModule(
                [...modules].concat(
                  <Module id={modules.length + 1} key={modules.length + 1} />
                )
              )
            }
          >
            +
          </button>
        </div>
      </div>

      <EditMenu
        menuVisability={editMenuVisability}
        top={positionMenu[0]}
        left={positionMenu[1]}
      />

      <div className="buttons">
        <button className="sequence-btn" onClick={() => setSequence(!sequence)}>
          {sequence ? 'Надписи' : 'Подписи'}
        </button>
      </div>
    </>
  );
}

export default App;
