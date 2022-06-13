import React from 'react';

export default function Helpers() {
  return (
    <div className="helpers">
      <p>Управление/горячие клавиши:</p>
      <ul>
        <li>
          Выделить аппарат: ЛКМ по номеру модуля (Shift + ЛКМ: выделить
          несколько)
        </li>
        <li>Отменить выделение аппарата: ЛКМ по номеру выделенного аппарата</li>
        <li>Удалить выделенные модули: Alt + Delete</li>
        <li>Убрать выделение со всех выделенных аппаратов: Escape</li>
      </ul>
    </div>
  );
}
