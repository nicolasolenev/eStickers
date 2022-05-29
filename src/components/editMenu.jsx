import React, { useState } from 'react';

export default function EditMenu(props) {
  return (
    <>
      <div
        className={
          !props.menuVisability ? 'edit-menu' : 'edit-menu edit-menu-visible'
        }
        style={{
          top: `${props.top + 13}px`,
          left: `${props.left - 140}px`,
        }}
      >
        <label htmlFor="where">
          Где:
          <textarea
            id="where"
            cols="20"
            rows="3"
            wrap="hard"
            placeholder="Где?"
          />
        </label>
        <label htmlFor="designation">
          Обозначение:
          <input type="text" id="designation" placeholder="QF1" />
        </label>
        <label htmlFor="designation">
          Надпись:
          <textarea
            cols="20"
            rows="3"
            wrap="hard"
            id="designation"
            placeholder="Надпись, название линии"
          />
        </label>
        <label htmlFor="phase">
          Фаза:
          <input type="text" id="phase" placeholder="Фаза" />
        </label>
        <label htmlFor="width">
          Ширина, мм:
          <input type="number" id="width" placeholder={18} />
        </label>

        <div className="edit-menu-buttons">
          <button>Сохранить</button>
          <button>Удалить модуль</button>
        </div>
      </div>
    </>
  );
}
