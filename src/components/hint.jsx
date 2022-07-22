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
              Выделить устройство: ЛКМ по номеру модуля (Shift + ЛКМ: выделить
              несколько подряд)
            </li>
            <li className="hint__li">
              Отменить выделение устройства: ЛКМ по номеру выделенного
              устройства
            </li>
            <li className="hint__li">
              Горячие клавиши можно посмотреть при наведении курсора на кнопки
              редактирования
            </li>
            <li className="hint__li">
              Темы "Случайная градиентная", "Случайная светлая", "Случайная
              тёмная" применяются только к группам, состоящим из 2 и более
              аппаратов!
            </li>
          </ul>
        </div>

        <div className="hint__window-tail"></div>
      </div>
    </div>
  );
}
