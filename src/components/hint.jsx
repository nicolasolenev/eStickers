import React, { useState } from 'react';

export default function Hint() {
  const [isVisible, setVisible] = useState(false);

  return (
    <div className="hint">
      <div className="hint__button-wrapper">
        <button className="hint__button" onClick={() => setVisible(!isVisible)}>
          {isVisible ? '×' : '?'}
        </button>
      </div>

      <div
        className={
          isVisible ? 'hint__window hint__window-active' : 'hint__window'
        }
      >
        <div className="hint__text-container">
          <p className="hint__title">Управление/горячие клавиши:</p>
          <ul>
            <li className="hint__li">
              Выделить аппарат: ЛКМ по номеру модуля (Shift + ЛКМ: выделить
              несколько)
            </li>
            <li className="hint__li">
              Отменить выделение аппарата: ЛКМ по номеру выделенного аппарата
            </li>
            <li className="hint__li">
              Горячие клавиши можно посмотреть при наведении курсора на активные
              кнопки
            </li>
          </ul>
        </div>

        <div className="hint__window-tail"></div>
      </div>
    </div>
  );
}
